require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
var { authors, books } = require('./data')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MongoDB...')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Author {
    name: String
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }



  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (args.author && args.genres) {
        const author = await Author.findOne({ name: args.author })
        return Book
          .find({ author: { $in: [ author._id ] } } )
          .find( { genres: { $in: [ args.genre ] } } ).populate('author')
      }
      if (args.genre) {
        return Book.find( { genres: { $in: [ args.genre ] } } ).populate('author')
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: [ author._id ] } } ).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: (root, args) => {
      return Author.find({})
    }   
  },
  Author: {
    bookCount: (root, args) => {
        return Book.find( { author: { $in: [ root.id ] } } ).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      let book = await Book.findOne({ title: args.title })
      if (book) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }

      let author =  await Author.findOne({ name: args.author })
      if (!author) {
        try {
          author = new Author({ name: args.author, born: null });
           await author.save()
        } catch (error) {
          throw new UserInputError('Error in creating new author', {
            invalidArgs: args.author,
          })
        }
      } 

      book = new Book(
        { 
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres 
        }
      )

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError('Error in creating new book', {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        const updateAuthor = {
          name: author.name,
          born: args.setBornTo,
          _id: author.id 
        }
  
        const updatedAuthor = await Author.findByIdAndUpdate(updateAuthor._id, updateAuthor, {new: true})
        return updatedAuthor
      } catch (error) {
        throw new UserInputError('Error in updating author', {
          invalidArgs: args        
        })
      }
    }  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
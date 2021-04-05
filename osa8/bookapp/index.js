require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { findOne } = require('./models/Book')

const JWT_SECRET = process.env.SECRET_KEY
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
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
    } ,
    me: (root, args, { currentUser }) => {
      return currentUser
    }   
  },
  Author: {
    bookCount: (root, args) => {
        return Book.find( { author: { $in: [ root.id ] } } ).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new UserInputError('You must log in to add a new book')
      }

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
          if (error.name === 'ValidationError') {
            throw new UserInputError('Author name minimum length is 4', {
              invalidArgs: args.author,            
            })
          } else {
            throw new UserInputError(error.message, {
              invalidArgs: args.author,
            })
          }
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
        if (error.name === 'ValidationError') {
          throw new UserInputError('Book title minimum length is 2', {
            invalidArgs: args,
          })          
        } else {
          throw new UserInputError('Error in creating new book', {
            invalidArgs: args,
          })
        }
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new UserInputError('You must log in to edit Author')
      }

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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      
      return user.save()
        .catch(error => {
          throw new  UserInputError(error.message, {
            invalidArgs: args
          })
        })
    } ,
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
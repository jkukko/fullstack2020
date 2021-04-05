import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      genres
      id
      author {
        name
    }
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const USER = gql`
   query {
     me { 
       username
       favoriteGenre
       id
     }
   }
 `
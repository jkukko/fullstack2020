import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [ genreSelector, setGenreSelector ] = useState(null)
  const [books, setBooks] = useState(null)  
  const booksAll = useQuery(ALL_BOOKS)

  const [getBooksByGenre, result] = useLazyQuery(ALL_BOOKS, { variables: { genre: genreSelector },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])
  
  useEffect(() => {
    if (booksAll.data) {
      setBooks(booksAll.data.allBooks)
    }
  }, [booksAll.data])

  if (!props.show) {
    return null
  }

  if ( result.loading ) {
    return <div>loading...</div>
  }
  const listOfGenres = [] 
  booksAll.data.allBooks.forEach(book => {
    book.genres.forEach(genre =>
      listOfGenres.includes(genre) ? null : listOfGenres.push(genre)
    )
  })
  
  const handleGenreSelect = async (event) => {
    event.preventDefault()

    if (event.target.value === 'all_genres') {
      setGenreSelector(null)
      return
    }

    setGenreSelector(event.target.value)
    getBooksByGenre()
  }

  return (
    <div>
      <h2>books</h2>
      
      <div>
      {genreSelector 
      ? <div> in genre <strong>{genreSelector}</strong> </div>
      : <div> all genres </div>
      }
      </div>
      
      <table>
        <tbody>
          <tr>
            <th>
              Book name
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {listOfGenres.sort().map(g => (
          <button key={g} value={g} onClick={handleGenreSelect}>
            {g}
          </button>
        ))}
        <button value={'all_genres'} onClick={handleGenreSelect}>all genres</button>
      </div>
    </div>
  )
}

export default Books
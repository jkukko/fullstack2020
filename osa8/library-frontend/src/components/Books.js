
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreSelector, setGenreSelector] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const listOfGenres = []

  books.forEach(b => {
    b.genres.forEach(g =>
      listOfGenres.includes(g) ? null : listOfGenres.push(g)
    )
  })

  //console.log(listOfGenres)

  let selectedBooks = []
  if (genreSelector) {
    selectedBooks = books.filter(b => b.genres.includes(genreSelector))
  } else {
    selectedBooks = books
  }

  const handleGenreSelector = (event) => {
    event.preventDefault()

    //console.log(event.target.value)

    if (event.target.value === 'all genres') {
      setGenreSelector(null)
      return
    }

    setGenreSelector(event.target.value)
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
          {selectedBooks.map(a =>
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
          <button key={g} value={g} onClick={handleGenreSelector}>
            {g}
          </button>
        ))}
        <button value={'all genres'} onClick={handleGenreSelector}>all genres</button>
      </div>
    </div>
  )
}

export default Books
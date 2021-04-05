import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = (props) => {

  const selectedGenre = props.user.favoriteGenre

  const results = useQuery(ALL_BOOKS, { variables: { genre: selectedGenre },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const selectedBooks = results.data.allBooks

  console.log(selectedBooks)

  if (!props.show) {
    return null
  }

  if (results.loading) {
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Here are books is your favorite genre: <strong>{selectedGenre}</strong>
      </div>
      <div>
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
      </div>  
    </div>
  )
  
}

export default Recommend
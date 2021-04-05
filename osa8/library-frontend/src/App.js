import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import { BOOK_ADDED, USER } from './queries'

const Notification = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const [getUser, result] = useLazyQuery(USER, {
    pollInterval: 500,
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  const handleRecomentation = () => {
    getUser()
    setPage('recommend')
    
  }

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me)
    }
  }, [result]) 

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }  

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const updateBooksCache = (newAddedBook) => {
    window.alert(`A new book added: ${newAddedBook.title}`)
  } 

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateBooksCache(subscriptionData.data.bookAdded)
    }
  })

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={handleRecomentation}>recommend</button>}
        {token && <button onClick={logout}>Logout</button>}
      </div>

      <Authors
        show={page === 'authors'} setError={notify}
      />

      <Books
        show={page === 'books'} 
      />

      <NewBook
        show={page === 'add'} setError={notify}
      />

      <LoginForm
        show={page === 'login'} setError={notify} setToken={setToken} setPage={setPage}
      />

      {user && 
      <Recommend
        show={page === 'recommend'} setError={notify} user={user}
      />
      }

    </div>
  )
}

export default App
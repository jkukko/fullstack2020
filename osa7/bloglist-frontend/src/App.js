import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs, newBlog } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { loginUser, setUser2, loggoutUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser2())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({username, password}))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${username} welcome back!`, 5, false)) 
    } catch(exception) {
      dispatch(setNotification(exception.response.data.error, 5, true))
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(newBlog(blog))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 5, false))
    } catch(exception) {
      dispatch(setNotification(exception.response.data.error, 5, true))
    }
  }

  const handleLogout = () => {
    dispatch(loggoutUser())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification  />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification  />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      <BlogList user={user} />
    </div>
  )
}

export default App
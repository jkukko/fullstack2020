import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Tooglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [systemMessage, setSystemMessage] = useState({ style: 'error', message: null })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = React.createRef()
  const longinInformation = {
    username: username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
    systemMessage,
    setSystemMessage
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogLiked = async (blogObject) => {

    try {
      const blogThatWillBeUpdated = { ...blogObject, likes: blogObject.likes += 1 }
      const updatedBlog = await blogService.update(blogObject.id, blogThatWillBeUpdated)
      setSystemMessage({ style: 'success', message:`blog ${updatedBlog.title} liked` })
      clearMessage()
    } catch (exception) {
      console.log(exception.message)
      setSystemMessage({ style: 'error', message: 'there was an issues in liking blog' })
      clearMessage()
    }
  }

  const handleRemoveBlog = async (blogObject) => {

    const check = window.confirm(`Do you want to remove blog ${blogObject.title} by ${blogObject.author}?`)

    if (check) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        setSystemMessage({ style: 'success', message: `blog ${blogObject.title} removed` })
        clearMessage()
      } catch (exception) {
        setSystemMessage({ style: 'error', message: 'there was an issues in removing blog' })
        clearMessage()
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(blogObject)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setSystemMessage({ style: 'success', message: `Blog: ${blog.title}, added succesfully` })
        clearMessage()
      })
      .catch(() => {
        setSystemMessage({ style: 'error', message: 'There was an issues in creating new blog' })
        clearMessage()
      })
  }

  function clearMessage () {
    setTimeout(() => {
      setSystemMessage({ style: 'null', message: null })
    }, 5000)
  }

  const blogFormInformation = {
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    addNewBlog
  }


  if (user === null) {
    return (
      <div>
        {systemMessage.message === null
          ? null
          : <p className={systemMessage.style}>{systemMessage.message}</p>
        }
        <h2>Log in to application</h2>
        
        <Tooglable buttonLabel="login">
          {loginForm(longinInformation)}
        </Tooglable>
      </div>
    )
  } else {
    return (
      <div>
        {systemMessage.message === null
          ? null
          : <p className={systemMessage.style}>{systemMessage.message}</p>
        }

        <h2>blogs</h2>

        <p>
          <strong>{user.name}</strong> logged in
        </p>
        <button onClick={() => handleLogout()}>Logout</button>

        <Tooglable buttonLabel='new blog' ref={blogFormRef}>
          {BlogForm(blogFormInformation)}
        </Tooglable>

        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onClickUpdate={() => handleBlogLiked(blog)}
            onClickRemove={() => handleRemoveBlog(blog)}
            user={user}
          />
        )}
      </div>
    )
  }

}

export default App
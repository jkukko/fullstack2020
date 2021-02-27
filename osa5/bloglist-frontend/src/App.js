import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginForm from './components/LoginForm'
import blogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  
  const longinInformation = {
    username: username,
    setUsername,
    password, 
    setPassword,
    user,
    setUser,
    errorMessage,
    setErrorMessage
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    console.log(blogObject)

    blogService.create(blogObject)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setAuthor('')
      })
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

        <h2>Log in to application</h2>
        {loginForm(longinInformation)}
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>

        <p>
          <strong>{user.name}</strong> logged in
        </p>
        <button onClick={() => handleLogout()}>Logout</button>

        {blogForm(blogFormInformation)}



        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )  
  }

}

export default App
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs, newBlog } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { loginUser, setUser } from './reducers/userReducer'
import UserList from './components/UserList'
import { getUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/BlogNew'
import Menu from './components/Menu'
import { 
  Container,
  Button,
  TextField,
  FormControl,
  makeStyles,
  Box,
  Typography
 } from '@material-ui/core'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  const history = useHistory()

  const dispatch = useDispatch()


  const useStyles = makeStyles({
    loginForm: {
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '15%'
    }
  })

  const classes = useStyles()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({username, password}))
      setUsername('')
      setPassword('')
      history.push('/blogs')
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

  if ( !user ) {
    return (
      <div>
        <Typography variant='h4'>
          Blogs app
        </Typography>
        <Typography variant='h5'>
          login to application
        </Typography>

        <Notification  />
        
        <form className={classes.loginForm} onSubmit={handleLogin}>
          <FormControl>
            <TextField
              id='username'
              value={username}
              label='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormControl>
          <FormControl>
            <TextField
              id='password'
              type='password'
              label='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormControl>
          <Box pt={2}>
            <Button variant="contained" color="primary" id='login' type='submit'>login</Button>
          </Box>
        </form>
      </div>
    )
  }
  return (
    <Container>
      <div>
        <Menu />
        <Box pt={1}>
          <Typography variant='h4'>
            Blogs app
          </Typography>
        </Box>

        <Notification  />
        

        <Switch>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/blogs'>
            <Box pt={1}>
              <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
                <NewBlog createBlog={createBlog} />
              </Togglable>
            </Box>
            <Box pt={1}>
              <BlogList user={user} />
            </Box>
          </Route>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
        </Switch>
      </div>
    </Container>
  )
}

export default App
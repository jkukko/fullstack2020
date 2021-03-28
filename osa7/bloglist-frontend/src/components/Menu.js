import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loggoutUser } from '../reducers/userReducer'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'


const Menu = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const padding = {
    paddingRight: 5
  }

  const handleLogout = () => {
    dispatch(loggoutUser())
  }
  

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
         <Button onClick={handleLogout}>Log out</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
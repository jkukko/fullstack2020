import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { 
  Typography,
  Box,
  List,
  ListItem
} from '@material-ui/core'

const User = () => {

  const users = useSelector(state => state.users)

  const id = useParams().id

  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant='h4'>
        {user.name}
      </Typography>
      <Box pt={1}>
        <Typography variant='h6'>
          Added blogs
        </Typography>
        <List variant='body' component='nav' aria-label="main mailbox folders">
          {user.blogs.map(blog => 
          <ListItem key={blog.id}>
            {blog.title}
          </ListItem>
          )}
        </List>
      </Box>
    </div> 
  )
}

export default User
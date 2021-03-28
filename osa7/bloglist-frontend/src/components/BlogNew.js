import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { 
  Typography,
  Box,
  FormControl,
  Button,
  Card,
  CardContent,
  CardActions,
  makeStyles,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    maxWidth: 150
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  comment: {
    display: 'flex', 
    flexDirection: 'column',
    maxWidth: '15%'    
  }
});

const Blog = () => {
  const [comment, setComment] = useState('')
  const classes = useStyles();

  const dispatch = useDispatch()

  const history = useHistory()

  const blogs = useSelector(state => state.blog)

  const user = useSelector(state => state.user)

  const id = useParams().id

  const blog = blogs.find(u => u.id === id)

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`blog ${blog.title} liked`, 5, false))
    } catch (exception) {
      dispatch(setNotification(`Error in liking blog ${blog.title} liked`, 5, true))
    }
  }
  
  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      try {
        dispatch(deleteBlog(blog.id))
        history.push('/blogs')
      } catch (exception) {

      }
    }
  }

  const handleComment = async () => {
    try {
      dispatch(commentBlog(blog.id, comment))
      dispatch(setNotification(`Comment ${comment} added`, 5, false))
      setComment('')
    } catch (exception) {
    }
  }

  console.log(blogs)

  if (!blog) {
    return null
  }

  return (
    <div>
      <Typography variant='h4'>
        {blog.title} {blog.author}
      </Typography>
      <p><a href={blog.url}>{blog.url}</a></p>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {blog.likes} likes
          </Typography>
        </CardContent>
        <CardActions>
         <Button id='like-button' variant="contained" color="primary" onClick={handleLike} type='submit'>like</Button>
        </CardActions>
      </Card>
      <Box pt={2}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Added by {blog.user.name}
            </Typography>
          </CardContent>
          <CardActions>
            {blog.user.name === user.name ? <Button id='remove-button' variant="contained" color="primary" onClick={handleRemove} type='submit'>remove</Button> : null}
          </CardActions>
        </Card>
      </Box>
      <form className={classes.comment} onSubmit={handleComment}>
        <FormControl>
          <TextField
            type='text'
            label='comment'
            id='comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </FormControl>
        <Box pt={2}>
         <Button id='comment-button' variant="contained" color="primary" type='Submit'>add comment</Button>
        </Box>
      </form>
    </div>
  )
}

export default Blog
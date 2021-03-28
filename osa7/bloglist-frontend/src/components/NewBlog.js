import React, { useState } from 'react'
import { 
  Button,
  TextField,
  FormControl,
  makeStyles,
  Box,
  Typography
 } from '@material-ui/core'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const useStyles = makeStyles({
    blogForm: {
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '15%'
    }
  })

  const classes = useStyles() 

  return (
    <div>
      <Typography variant='h6'>
        Create new blog
      </Typography>
      <form className={classes.blogForm} onSubmit={handleNewBlog}>
        <FormControl>
          <TextField
            id='author'
            value={author}
            label='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            id='title'
            value={title}
            label='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            id='url'
            value={url}
            label='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormControl>
        <Box pt={1}>
          <Button variant="contained" color="primary" id="create" type='submit'>create</Button>
        </Box>
      </form>
    </div>
  )
}

export default NewBlog
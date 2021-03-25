import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {

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

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>
      <p><a href={blog.url}>{blog.url}</a></p>
      {blog.likes} likes <button id='like-button' onClick={handleLike}>like</button>
      <p>
        Added by {blog.user.name} {blog.user.name === user.name ? <button id='remove-button' onClick={handleRemove}>remove</button> : null}
      </p>
    </div>
  )
}

export default Blog
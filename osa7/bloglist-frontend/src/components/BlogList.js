import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)

  const user = useSelector(state => state.user)

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`blog ${blog.title} liked`, 5, false))
    } catch (exception) {
      dispatch(setNotification(`Error in liking blog ${blog.title} liked`, 5, true))
    }
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      try {
        dispatch(deleteBlog(id))
      } catch (exception) {  
    }

    }
  }
 
  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => 
        <Blog 
          key={blog.id} 
          blog={blog} 
          handleLike={handleLike} 
          handleRemove={handleRemove} 
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )

}

export default BlogList
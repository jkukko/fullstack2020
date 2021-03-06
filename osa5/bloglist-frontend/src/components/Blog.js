import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, onClickUpdate, onClickRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { 
    display: visible ? 'none' : '' ,
    border: 'solid',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={blogStyle}>
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
          {blog.url}
        <div>
          {blog.likes} <button onClick={onClickUpdate}>Like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {user.name === blog.user.name ? <button onClick={onClickRemove}>remove</button> : null}
        </div>
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onClickUpdate: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired
}

export default Blog

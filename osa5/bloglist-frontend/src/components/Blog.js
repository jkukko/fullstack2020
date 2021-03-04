import React, { useState } from 'react'
const Blog = ({ blog }) => {
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
        <div>
          {blog.url}
        </div>
          {blog.likes} <button onClick={console.log('like more')}>Like</button>
        </div>
        <div>
          {blog.author} 
        </div>
      </div>
    </div>
  )
}

export default Blog

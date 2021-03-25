import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blog)
 
  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => 
        <ul key={blog.title} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </ul>
      )}
    </div>
  )

}

export default BlogList
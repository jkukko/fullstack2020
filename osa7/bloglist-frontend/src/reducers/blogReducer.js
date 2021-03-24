  import blogService from '../services/blogs'

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {

    const updatedBlog = await blogService.update({...blog, likes: blog.likes += 1})
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const id = action.data.id
      const blogLiked = state.find(b => b.id === id)
      return state.map(blog => blog.id !== id ? blog : blogLiked)
    case 'DELETE_BLOG':
      const removedBlogId = action.data
      return state.filter((blog) => blog.id !== removedBlogId)
    default:
      return state
  }
}

export default blogReducer
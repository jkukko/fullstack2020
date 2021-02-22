const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const deCodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !deCodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(deCodedToken.id)

  const blog = new Blog(body)
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const deleteBlog = await Blog.findByIdAndRemove(request.params.id)

  if (deleteBlog) {
    response.status(202).end()
  } else {
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blogWithUpdatedInformation = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blogWithUpdatedInformation, 
      { 
        new: true, 
        setDefaultsOnInsert: true ,
      })

  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON())
  } else {
    response.status(204).end()
  }

})
module.exports = blogsRouter
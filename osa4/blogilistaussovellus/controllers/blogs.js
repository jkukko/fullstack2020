const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => { 
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const deCodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !deCodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(deCodedToken.id)

  const blog = new Blog(body)

  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const deCodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !deCodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(204).end()
  }
  console.log(blog)
  if (blog.user.toString() === deCodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
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
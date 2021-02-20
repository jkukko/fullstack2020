const blogsRouter = require('express').Router()
const { response, request } = require('express')
const { syncIndexes } = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const newBlog = await blog.save()
  response.status(201).json(newBlog.toJSON())
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
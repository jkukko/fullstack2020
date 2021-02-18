const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

notesRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const newBlog = await blog.save()
  response.status(201).json(newBlog.toJSON)
})

module.exports = notesRouter
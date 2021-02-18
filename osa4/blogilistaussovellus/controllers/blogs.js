const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
  await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

notesRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = notesRouter
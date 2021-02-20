const { response } = require('express')
const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
]

const newBlog = {
    title: 'NEW BLOG TEST',
    author: 'NEW BLOG AUTHOR',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
}

const newBlogWithoutLikes = {
    title: 'NEW BLOG TEST WITHOUT LIKES',
    author: 'NEW BLOG AUTHOR WITHOUT LIKES',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' 
}

const blogMissingTitleAndUrl = {
    author: 'joouman',
    likes: 10
}

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogObject = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObject.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })        
})



test('blog contains id field', async() => {
    const response = await api.get('/api/blogs')
    const blog = response.body
    expect(blog[0].id).toBeDefined()
    expect(blog[0]._id).not.toBeDefined()
})

describe('Adding new blog', async() => {
    test('creating a new blog and POST', async() => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        const response = await api.get('/api/blogs')
        const blogs = response.body
        expect(blogs.length).toBe(initialBlogs.length + 1)
        expect(blogs[blogs.length - 1].title).toBe(newBlog.title)
    })
    test('POST a new blog without likes, adds default likes 0', async() => {

        const response = await api
            .post('/api/blogs')
            .send(newBlogWithoutLikes)
            .expect(201)
    
        expect(response.body.likes).toBe(0)
    
    
        //const response = await api.get('/api/blogs')
    
       //console.log(response.body[response.body.length - 1].likes).toBe(0)
    })
    test('POST a new blog missing title and url information', async() => {

        await api
            .post('/api/blogs')
            .send(blogMissingTitleAndUrl)
            .expect(400)
    })
    
})


afterAll(() => {
    mongoose.connection.close()
})

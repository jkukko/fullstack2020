const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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

async function getLoginToken () {
    const loginResponse = await api.post('/api/login')
        .send({
            username: 'jouman',
            password: 'salasana'
        })
        .expect(200)
    return 'bearer ' + loginResponse.body.token
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

describe('Adding new blog', () => {
    test('creating a new blog and POST', async() => {
        const token = await getLoginToken()
        await api
            .post('/api/blogs')
            .set('authorization', token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const blogs = response.body
        expect(blogs.length).toBe(initialBlogs.length + 1)
        expect(blogs[blogs.length - 1].title).toBe(newBlog.title)
    })
    test('POST a new blog without likes, adds default likes 0', async() => {
        const token = await getLoginToken()
        const response = await api
            .post('/api/blogs')
            .set('authorization', token)
            .send(newBlogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    
    
        //const response = await api.get('/api/blogs')
    
       //console.log(response.body[response.body.length - 1].likes).toBe(0)
    })
    test('POST a new blog missing title and url information', async() => {
        const token = await getLoginToken()
        await api
            .post('/api/blogs')
            .set('authorization', token)
            .send(blogMissingTitleAndUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    
})

test('Update blog, changing likes amount', async () => {
    const blogThatIsUpdated = initialBlogs[0]
    blogThatIsUpdated.likes = 100
    
    await api
        .put(`/api/blogs/${blogThatIsUpdated._id}`)
        .send(blogThatIsUpdated)
        .expect(200)
        
    const selectBlog = await api.get(`/api/blogs/${blogThatIsUpdated._id}`)

    expect(selectBlog.body.likes).toBe(100)
})

describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('root', 10)
        const user = new User({ username: 'root', name: 'root', passwordHash })

        await user.save
    })

    test('response is JSON formant', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Adding new user', () => {
    test('create a new user', async () => {
        
        const usersAtBegining = await api.get('/api/users')

        const newUser = {
            username: 'jouman' ,
            name: 'jou man',
            password: 'salasana'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdding = await api.get('/api/users')
        const userNames = usersAfterAdding.body.map(u => u.username)
        expect(usersAfterAdding.body.length).toBe(usersAtBegining.body.length + 1)
        expect(userNames).toContain(newUser.username)
    })

    test('user creation failed because the username was too short', async () => {

        const newUser = {
            username: 'jo',
            name: 'jou man',
            password: 'salasana'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('User validation failed: username: Path `username` (`jo`) is shorter than the minimum allowed length (3)')
    })

    test('user creation failed because username is not unique (already taken)', async () => {

        const userAtBegining = await api.get('/api/users')

        console.log(userAtBegining.body)

        const newUser = {
            username: 'jouman',
            name: 'jouman',
            password: 'salasana'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value: `jouman`')
    })

    test('user creation failed because password was too short', async () => {

        const newUser = {
            username: 'kayttaja',
            name: 'kayttaja',
            password: 'sa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password minimum lenght is 3 characters')

    })

})

afterAll(() => {
    mongoose.connection.close()
})

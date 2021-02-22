const bcrypt = require('bcrypt')
const { response } = require('express')
const { request } = require('../app')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, author: 1})

    response.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username || !body.password) {
        return response.status(400).json({ error: 'Username and Password are required' })
    }

    if (body.password.length <= 2) {
        return response.status(400).json({ error: "Password minimum lenght is 3 characters" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const saveUser = await user.save()

    response.json(saveUser)
})

module.exports = userRouter
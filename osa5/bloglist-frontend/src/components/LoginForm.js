import React from 'react'
import loginService from '../services/login'

const LoginForm = (props) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('loggin in with', username, password)
        
        const info = {
            username: props.username,
            password: props.password
        }

        console.log(props.password)

        try {
            const user = await loginService.login(info)

            window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
            )
            props.setUser(user)
            props.setUsername('')
            props.setPassword('')
        } catch (exception) {
            props.setUsername('')
            props.setPassword('')
            props.setSystemMessage({ style: 'error', message: 'wrong credentials'})
                setTimeout(() => {
                    props.setSystemMessage({ message: null })
                }, 5000)
        }
    
    }
    return (
        <form onSubmit={handleLogin}>
        <div>
            username
            <input
            type='text'
            value={props.username}
            name='Username'
            onChange={({ target }) => props.setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
            type='password'
            value={props.password}
            name='Password'
            onChange={({ target }) => props.setPassword(target.value)}
            />
        </div>
        <button type='Submit'>login</button>
        </form>
    )    
}

export default LoginForm
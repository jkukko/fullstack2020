import React from 'react'
import LoginForm from './LoginForm'


const BlogFrom = (props) => {

    return (
        <form onSubmit={props.addNewBlog}>
            <div>
                Title:
                <input
                    type='text'
                    value={props.title}
                    onChange={({ target }) => props.setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    type='text'
                    value={props.author}
                    onChange={({ target }) => props.setAuthor(target.value)}
                />
            </div>
            <div>
                Url:
                <input
                    type='text'
                    value={props.url}
                    onChange={({ target }) => props.setUrl(target.value)}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogFrom
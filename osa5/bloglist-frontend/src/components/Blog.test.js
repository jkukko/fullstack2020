import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {
    const blog = {
        title: 'test blog: title',
        author: 'test blog: author',
        url: 'test blog: url',
        likes: 'test blog: likes',
        user: {
            username: 'test username',
            name: 'test name'    
        }
    }

    const user = {
        username: 'test username',
        name: 'test name'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    expect(component.container).toHaveTextContent(
        'test blog: title'
    )

    expect(component.container).toHaveTextContent(
        'test blog: author'
    )
})
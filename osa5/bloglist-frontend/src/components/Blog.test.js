import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {
    const blog = {
        title: 'test blog: title',
        author: 'test blog: author',
        url: 'test blog: url',
        likes: 1,
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

test('clicking button to render full blog information', () => {
    const blog = {
        title: 'test blog: title',
        author: 'test blog: author',
        url: 'test blog: url',
        likes: 'likes 1',
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
        <Blog blog={blog} user={blog.user}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'likes 1'
    )

    expect(component.container).toHaveTextContent(
        'test blog: url'
    )
})
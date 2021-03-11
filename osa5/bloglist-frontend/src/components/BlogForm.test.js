import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates information and calls onSubmit', () => {
  const createBlog = jest.fn()
  const blogFormInformation = { createBlog }

  const component = render(
    <BlogForm blogFormInformation={blogFormInformation} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#form-blog')

  fireEvent.change(title, { target: { value: 'test blog title' } })
  fireEvent.change(author, { target: { value: 'test blog author' } })
  fireEvent.change(url, { target: { value: 'test blog url' } })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].content).toBe('test blog title')
})
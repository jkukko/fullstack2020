import React from 'react'

const BlogFrom = (props) => {

  return (
    <div  className='fromDiv'>
      <form id='form-blog' onSubmit={props.addNewBlog}>
        <div>
          Title:
          <input
            type='text'
            id='title'
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            id='author'
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            id='url'
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogFrom
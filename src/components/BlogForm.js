import React from 'react'

const BlogForm = ({ addBlog, title, author, url, handleTitleChange, handleAuthorchange, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
      <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>

      <div>
        author:
      <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorchange}
        />
      </div>
      <div>
        url:
      <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm

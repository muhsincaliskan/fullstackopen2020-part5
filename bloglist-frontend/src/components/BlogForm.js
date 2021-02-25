import React, { useState } from 'react'
const BlogForm = ({ createBlog, user }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      user: { id: user.id, username: user.username },
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      // id: blogs.length + 1,
    })
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')

  }
  return (
    <div>
      <form onSubmit={addBlog} className='formDiv'>
        <h2>Create a new blog</h2>
        <div>Title:
          <input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div> Author:
          <input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>Url:
          <input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, handleDelete, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: '5px'
  }


  return (
    <div className='blog' style={blogStyle}>
      <div>
        <p>{blog.title} {blog.author}</p>
      </div>
      <Togglable buttonLabel="View" >

        <p>{blog.url}</p>
        <p> likes {blog.likes} <button id="like-button" onClick={() => handleLike(blog.id)} >Like</button></p>

      </Togglable>
      <button id="delete-button" type="submit" onClick={() => handleDelete(blog)} >Remove</button>
    </div>
  )
}

export default Blog

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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="View" >
        {blog.url}<br></br>
          likes {blog.likes} <button onClick={() => handleLike(blog.id)} >Like</button>
        <br></br>
        {/* {blog.user.username} */}
      </Togglable>


      <button type="submit" onClick={() => handleDelete(blog)} >Remove</button>
    </div>
  )
}

export default Blog

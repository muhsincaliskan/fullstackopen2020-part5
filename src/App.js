import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({ type: null, message: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const errorHandler = (type, message) => {
    setNotificationMessage(
      {
        type: type,
        message: message
      }
    )
    setTimeout(() => {
      setNotificationMessage({ type: null, message: '' })
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        errorHandler('success', 'New blog added')
      })
      .catch(() => errorHandler('error', 'Blog could not be added!'))
  }
  const handleDelete = (blog) => {

    if (window.confirm(`Remove Blog ${blog.title}! by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
        .then(() => { setBlogs(blogs.filter(n => n.id !== blog.id)) })
        .catch(() => alert('Already Deleted.'))
      errorHandler('success', `Deleted ${blog.title}`)
    }
  }
  const handleLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        errorHandler('error', `Note '${blog.title}' was already removed from server`)
      })
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      errorHandler('error', 'wrong credentials')
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      errorHandler('error', 'something wrong')
    }
  }


  const loginForm = () => {
    // const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    // const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <Togglable buttonLabel='Login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>

    )
  }
  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  )



  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
      {user === null ?
        loginForm() :

        <div>
          <p>{user.username} logged in<button onClick={handleLogout} type="submit">Logout</button></p>

          {blogForm()}
        </div>
      }


      <ul>  {blogs.sort((a, b) => b.likes - a.likes).map((blog, i) =>
        <Blog key={i} blog={blog} handleDelete={handleDelete} handleLike={handleLike} />
      )}</ul>


      <Footer />
    </div>
  )
}

export default App
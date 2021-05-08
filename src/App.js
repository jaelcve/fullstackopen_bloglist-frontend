import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notificatons'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setError] = useState(false);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleAuthorchange = ({ target }) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayMessage('Wrong credentials', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      displayMessage(`a new blog ${response.title} by ${response.author} added`, false)
    } catch (exception) {
      displayMessage('Error adding blog', true)
    }
  }
  
  const displayMessage = (message, isError) => {
    setErrorMessage(message)
    setError(isError)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>

      { user === null ?
        <div>
          <h2>Login to application</h2>
          <Notification message={errorMessage} isError={isError} />
          <LoginForm handleLogin={handleLogin} handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange} username={username} password={password} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} isError={isError} />
          <p>{user.name} logged in  <Button handleClick={() => handleLogout()} text='Logout'></Button></p>

          <h2>create new</h2>

          <BlogForm handleTitleChange={handleTitleChange} handleAuthorchange={handleAuthorchange}
            handleUrlChange={handleUrlChange} title={title} author={author} url={url} addBlog={addBlog} />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}


        </div>
      }



    </div>
  )
}

export default App
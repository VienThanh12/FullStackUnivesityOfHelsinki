import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notifications'
import NotiOfCreating from './components/NotiOfCreating'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [noti, setNoti] = useState(null)
    const [user, setUser] = useState(null)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService
            .getAll()
            .then(initialBlogs => setBlogs(initialBlogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [blogs])

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          })
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          ) 
          console.log(window.localStorage)
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setErrorMessage('wrong username or password')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }

    const loginForm = () => {
        return (
            <form onSubmit = {handleLogin}>
                <div>
                    username
                    <input
                    type = "text"
                    value = {username}
                    name = "Username"
                    onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                    type = "password"
                    value = {password}
                    name = "Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type = "submit"> login </button>
            </form>
        )
    }
    const addBlog = (event) => {
        event.preventDefault()
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }
    blogService
      .create(blogObject)
        .then(returnedBlog => {
            setNoti(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
            setBlogs(blogs.concat(returnedBlog))
            setTimeout(() => {
                setNoti(null)
            }, 5000)

      })
    }

    const logOut = (event) => {
        window.localStorage.clear()
       // console.log(window.localStorage)
        setUser(null)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <Notification message = {errorMessage}/>
            <NotiOfCreating message = {noti} />
            <h2> blogs </h2>
            {user === null && loginForm()}
            {user !== null && 
            <div>    
                <p> {user.username} logged in <button onClick = {logOut}> logout </button> </p> 
            </div>
            }

            <Togglable buttonLabel = 'new note'>
                <h2> creat new</h2>
                <BlogForm
                        addBlog = {addBlog}
                        title = {title}
                        author = {author}
                        url = {url}
                        handleTitleChange = {({target}) => setTitle(target.value)}
                        handleAuthorChange = {({target}) => setAuthor(target.value)}
                        handleUrlChange = {({target}) => setUrl(target.value)}
                />
            </Togglable>

            {blogs.map(blog => 
            <Blog key = {blog.id} blog = {blog}/>)}
        </div>
    )
}
export default App
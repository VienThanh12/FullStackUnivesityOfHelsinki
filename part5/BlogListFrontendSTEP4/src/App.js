import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notifications'
import NotiOfCreating from './components/NotiOfCreating'

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
    }, [blogs])

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
            setTimeout(() => {
                setNoti(null)
            }, 5000)

      })
    }

    const blogForm = () => {
        return(
            <form onSubmit = {addBlog}>
                <div>
                    title:
                        <input
                        type = "title"
                        name = "Title"
                        value = {title}
                        onChange = {({target}) => setTitle(target.value)}
                        />
                </div>
                <div>
                    author:
                        <input
                        type = "author"
                        name = "Author"
                        value = {author}
                        onChange = {({target}) => setAuthor(target.value)}
                        />
                </div>
                <div>
                    url:
                        <input
                        type = "url"
                        name = "Url"
                        value = {url}
                        onChange = {({target}) => setUrl(target.value)}
                        />
                </div>
                <button type = "submit">create</button>
            </form>
        )
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
            <h2> creat new </h2>
            {blogForm()}

            {blogs.map(blog => 
            <Blog key = {blog.id} blog = {blog}/>)}
        </div>
    )
}
export default App
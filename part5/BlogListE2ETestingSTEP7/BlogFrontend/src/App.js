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
            .then(initialBlogs => {
                for(var i = 0; i < initialBlogs.length; i++){
                    for(var j = i + 1; j < initialBlogs.length; j++){
                        if(initialBlogs[i].likes < initialBlogs[j].likes){
                            let temp = initialBlogs[i]
                            initialBlogs[i] = initialBlogs[j]
                            initialBlogs[j] = temp                            
                        }                        
                    }
                }
                setBlogs(initialBlogs)
                }
            )
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
                    id='username'
                    type = "text"
                    value = {username}
                    name = "Username"
                    onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                    id='password'
                    type = "password"
                    value = {password}
                    name = "Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type = "submit"> login </button>
            </form>
        )
    }
    const addBlog = (event) => {
    if(!user){
        setErrorMessage('please enter username and password before creating a new blog')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
    else{
            event.preventDefault()
            const blogObject = {
                title: title,
                author: author,
                url: url
            }
        blogService
        .create(blogObject)
            .then(returnedBlog => {
                //console.log(returnedBlog)
                setNoti(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
                setBlogs(blogs.concat(returnedBlog))
                console.log(returnedBlog)
                setTimeout(() => {
                    setNoti(null)
                }, 5000)

            })
        }
    }

    const addLikes = (blog) => {
        const blogObject = {
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            user: blog.user.id,
            url: blog.url
        }
    blogService
        .update(blog.id, blogObject)
        .then((returnedBlog) => {
            var blog = blogs.map((blogs) => blogs.id === returnedBlog.id ? returnedBlog : blogs)
            console.log(returnedBlog)
            setBlogs(blog)
        })
    }
    const logOut = (event) => {
        window.localStorage.clear()
        setUser(null)
        setUsername('')
        setPassword('')
    }

    const removeBlog = (blog) => {
        console.log(blog)
        //console.log("hi")
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            blogService
                .remove(blog.id)
                .then((returnedBlog) => {
                    setNoti("Deleting was successful")
                    setTimeout(() => {
                        setNoti(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage("Deleting was unsuccessful because of invalid user or expired token.")
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    }
    return (
        <div>
            <Notification message = {errorMessage}/>
            <NotiOfCreating message = {noti} />
            <h2> <b> blogs </b> </h2>
            {user === null && loginForm()}
            {user !== null && 
            <div>    
                <p> {user.username} logged in <button id = "logout-button" onClick = {logOut}> logout </button> </p> 
            </div>
            }

            <Togglable buttonLabelFirst = 'create new blog' buttonLabelSecond = 'cancel'  buttonLabel = "hi">
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
            <Blog id = "blog-content" key = {blog.id} blog = {blog} addLikes = {addLikes} removeBlog = {removeBlog}/>)}
        </div>
    )
}
export default App
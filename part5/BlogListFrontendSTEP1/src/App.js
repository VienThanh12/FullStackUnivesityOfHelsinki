import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    const handleSubmit = () => {
    }

    useEffect(() => {
        blogService
            .getAll()
            .then(initialBlogs => setBlogs(initialBlogs))
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          })
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setErrorMessage('Wrong credentials')
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
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type = "submit"> login </button>
            </form>
        )
    }
    const addBlog = (event) => {
        event.preventDefault()
        
      }

    const blogForm = () => {
        <form onSubmit = {addBlog}>
            <input
            value = {newBlog}
            onChange = {({target}) => setNewBlog(target.value)}
            />
            <button type = "submit">save</button>
        </form>
    }

    return (
        <div>
            <h2> blogs </h2>
            {user === null && loginForm()}
            {user !== null && 
            <div> 
                <p> {user.username} logged in </p>
                {blogForm()}
            </div>
            }
            {blogs.map(blog => 
            <Blog key = {blog.id} blog = {blog}/>)}
        </div>
    )
}
export default App
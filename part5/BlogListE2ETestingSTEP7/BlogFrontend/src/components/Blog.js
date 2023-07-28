import { useState } from 'react'

const Blog = ({blog, addLikes, removeBlog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  //console.log(blog.user.username)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    
   
    return (
    <div style = {blogStyle}>
      <div style = {hideWhenVisible} className = 'blog'>
        {blog.title} {blog.author} {}
        <button id = "view-button" onClick = {toggleVisibility}> view </button>
      </div>
      <div style = {showWhenVisible} className = 'view'>
        {blog.title} {blog.author} <button onClick = {toggleVisibility}> hide </button>  
        <br></br> 
        {blog.url} 
        <br></br>
        likes {blog.likes} <button id = "like-button" onClick = {() => addLikes(blog)}> like </button>
        <br></br>
        {blog.user.name}  
        <br></br>
        {<button id = "delete-button" onClick = {() => removeBlog(blog)}> remove </button>}
      </div>
    </div>
    )
}

export default Blog
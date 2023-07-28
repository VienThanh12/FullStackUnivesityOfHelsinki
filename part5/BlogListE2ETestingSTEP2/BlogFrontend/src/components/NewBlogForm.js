import PropTypes from 'prop-types'
import { useState } from 'react'

const NewBlogForm = ({
    createdBlog
    }) => {
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
        createdBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <form onSubmit = {addBlog}>
                <div>
                    title:
                        <input
                        type = "title"
                        name = "Title"
                        value = {newTitle}
                        onChange = {handleTitleChange}
                        />
                </div>
                <div>
                    author:
                        <input
                        type = "author"
                        name = "Author"
                        value = {newAuthor}
                        onChange = {handleAuthorChange}
                        />
                </div>
                <div>
                    url:
                        <input
                        type = "url"
                        name = "Url"
                        value = {newUrl}
                        onChange = {handleUrlChange}
                        />
                </div>
                <button type = "submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm
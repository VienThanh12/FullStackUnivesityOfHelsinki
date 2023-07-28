import PropTypes from 'prop-types'

const BlogForm = ({
    addBlog,
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
    }) => {
    return (
        <div>
            <form onSubmit = {addBlog}>
                <div>
                    title:
                        <input
                        id = "title"
                        type = "title"
                        name = "Title"
                        value = {title}
                        onChange = {handleTitleChange}
                        />
                </div>
                <div>
                    author:
                        <input
                        id = "author"
                        type = "author"
                        name = "Author"
                        value = {author}
                        onChange = {handleAuthorChange}
                        />
                </div>
                <div>
                    url:
                        <input
                        id = "url"
                        type = "url"
                        name = "Url"
                        value = {url}
                        onChange = {handleUrlChange}
                        />
                </div>
                <button id = "create-button" type = "submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,    
    url: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired

}
export default BlogForm
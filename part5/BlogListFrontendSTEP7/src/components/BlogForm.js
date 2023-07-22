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
                        type = "title"
                        name = "Title"
                        value = {title}
                        onChange = {handleTitleChange}
                        />
                </div>
                <div>
                    author:
                        <input
                        type = "author"
                        name = "Author"
                        value = {author}
                        onChange = {handleAuthorChange}
                        />
                </div>
                <div>
                    url:
                        <input
                        type = "url"
                        name = "Url"
                        value = {url}
                        onChange = {handleUrlChange}
                        />
                </div>
                <button type = "submit">create</button>
            </form>
        </div>
    )
}
export default BlogForm
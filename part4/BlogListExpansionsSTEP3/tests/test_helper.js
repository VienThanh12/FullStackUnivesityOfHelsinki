const Blog = require('../models/blog')

const initialBlog = [
    {
        title: 'fullstack',
        author: 'havien',
        url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_in…',
        likes: 1234567
    },
    {
        title: 'full',
        author: 'ha',
        url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_in…',
        likes: 123456
    }
]

const BlogInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlog, BlogInDb
}
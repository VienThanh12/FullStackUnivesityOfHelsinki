const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    //console.log(blog)
    if(!blog.likes)
        blog.likes = 0
    // //console.log(blog)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})
module.exports = blogsRouter
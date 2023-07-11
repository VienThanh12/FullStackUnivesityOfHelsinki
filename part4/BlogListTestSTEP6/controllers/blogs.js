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
    if(!blog.url || !blog.title){
        response.status(400).end()
    }
    else{
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    }
})
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
module.exports = blogsRouter
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

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body
    //console.log(body)
    const blog = {
        id: body.id,    
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    //console.log(blog)

    const UpdatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(UpdatedBlog)
}) 
module.exports = blogsRouter
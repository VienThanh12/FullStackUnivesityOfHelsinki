const blogsRouter = require('express').Router()

const jwt = require('jsonwebtoken') 

const Blog = require('../models/blog')
const User = require('../models/user')
//const { tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //console.log('token: ', tokenExtractor(request))
    //console.log('token', request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //console.log(request.token)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    //console.log(decodedToken)
    const user = await User.findById(decodedToken.id)
    if(!body.likes)
        body.likes = 0
    //console.log(body.userId)
    //console.log(user)
    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        likes: body.likes,
        user: user.id
    })
    //console.log(blog)
    if(!body.url || !body.title){
        response.status(400).end()
    }
    else{

        const savedBlog = await blog.save()
        
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
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
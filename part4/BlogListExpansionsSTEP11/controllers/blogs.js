const blogsRouter = require('express').Router()

const jwt = require('jsonwebtoken') 

const Blog = require('../models/blog') // Blog data
const User = require('../models/user') // User data
//const { tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    //console.log('code',decodedToken)
    const user = request.user
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
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    response.send(blog)
})
blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    if(request.token === undefined){
        response.status(401).json({
            error: 'deleting a blog is attempted without a token or by an invalid user'
        })    
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if(blog.user.username === decodedToken.username){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else{
        response.status(401).json({
            error: 'deleting a blog is attempted without a token or by an invalid user'
        })    
    }
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
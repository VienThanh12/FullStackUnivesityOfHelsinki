const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
// test blog app (retrieve the list of data from testBlogApp)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({}) // delete all the databases
    await Blog.insertMany(helper.initialBlog) // create initialBlog
}, 10000000)

var loggedInToken = ''
beforeEach(async ( )=> {
    const response = await api
        .post('/api/login')
        .send({
            username: 'hellas',
            password: 'haducthanhvien'
        })

    loggedInToken = response.body.token
    
})

test('blogs are returned as json', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000000)

test('there is 2 blog', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlog.length)
})
test('id to be defined', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
})
test('posting is successfully creates a new blog post', async () => {
    const newBlog = {
        title: 'a new blog',
        author: 'kevin',
        url: 'https://cloud.mongodb.com/v2',
        likes: 999
    }

    //console.log('tokennnnn', loggedInToken)
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedInToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.BlogInDb()
    
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)
})
test('likes', async () => {
    const newBlog = {
        title: 'a new blog',
        author: 'kevin',
        url: 'https://cloud.mongodb.com/v2'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
    
    const response = await api.get('/api/blogs')
    //console.log(response.body)
    var ok = 1
    for(var i = 0; i < response.body.length; i++){
        //console.log(response.body[i].likes)
        if(response.body[i].likes === undefined){
        //  console.log(response.body[i].likes)
            ok = 0
            //console.log("there is a ")
        }
    }
    expect(ok).toEqual(1)
}, 10000000)

test('title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
        author: 'kevin',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
}, 10000000)
describe('delete function', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.BlogInDb()
        const blogToBeDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToBeDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await helper.BlogInDb()
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlog.length - 1
        )
        const contents = blogsAtEnd.map(r => r.content)

        expect(contents).not.toContain(blogToBeDelete)
    })
})

describe('put function', () => {

    test('replace', async () => {
        const blogsAtStart = await helper.BlogInDb()
        const blogToReplace = {
            id: blogsAtStart[0].id,
            title: blogsAtStart[0].title,
            author: blogsAtStart[0].author,
            url: blogsAtStart[0].url,
            likes: 10000
        }
        //console.log(blogToReplace)

        await api
            .put(`/api/blogs/${blogToReplace.id}`)
            .send(blogToReplace)
            
        
        const blogsAtEnd = await helper.BlogInDb()
        
        var ok = 1
        //console.log(blogsAtStart[0])
        //console.log(blogsAtEnd[0])
        if(blogsAtEnd[0].likes === blogsAtStart[0].likes)
            ok = 0
        
        expect(blogsAtEnd[0].id).toEqual(blogsAtStart[0].id)
        expect(blogsAtEnd[0].title).toEqual(blogsAtStart[0].title)
        expect(blogsAtEnd[0].author).toEqual(blogsAtStart[0].author)
        expect(blogsAtEnd[0].url).toEqual(blogsAtStart[0].url)
        expect(ok).toEqual(1)
        //console.log(blogsAtEnd)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})

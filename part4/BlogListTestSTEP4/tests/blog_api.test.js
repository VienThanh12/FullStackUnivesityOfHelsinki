const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
// test blog app (retrieve the list of data from testBlogApp)

test('blogs are returned as json', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)
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

    await api
        .post('/api/blogs')
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
}, 100000)

afterAll(async () => {
    await mongoose.connection.close()
})

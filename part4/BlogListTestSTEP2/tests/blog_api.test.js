const mongoose = require('mongoose')
const supertest = require('supertest')

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
    expect(response.body).toHaveLength(2)
})
test('id to be defined', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
})
afterAll(async () => {
    await mongoose.connection.close()
})

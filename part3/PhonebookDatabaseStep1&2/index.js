const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors') // accest cors policy

const app = express()


app.use(cors()) // cors policy
app.use(express.static('build'))  // accest to front-end
app.use(express.json())
// https://github.com/expressjs/morgan#creating-new-tokens
// Define a custom token for request body data
morgan.token('body', (request) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

const Person = require('./models/person')

app.get('/api/persons', (request, response) =>{
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  //response.send(persons)
  const date = new Date()
  let day = date.toLocaleString('en-us', { weekday: 'long' });
  let month = date.toLocaleString('en-us', { month: 'long' });
  response.send(
  `<p>Phonebook has information for ${Person.length} people</p> 
  <p> ${date} </p>`
  )
  console.log(date)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(body.name === undefined || body.number === undefined){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/info/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person = Person.filter(person => person.id !== id)
  response.json(Pers)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

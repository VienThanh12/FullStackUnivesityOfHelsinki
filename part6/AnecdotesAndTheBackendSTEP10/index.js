const express = require('express')
const morgan = require('morgan')
const cors = require('cors') // accest cors policy

const app = express()

app.use(cors()) // cors policy
app.use(express.static('build'))  // accest to front-end
app.use(express.json())
// https://github.com/expressjs/morgan#creating-new-tokens
// Define a custom token for request body data
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

const Person = require('./models/person')

const errorHandler = (error, request, response) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  console.log(error.name)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(persons => {
    response.send(
      `<p>Phonebook has information for ${ persons.length} people</p> 
      <p> ${date} </p>`
    )
  })
  console.log(date)
})

app.post('/api/persons', (request, response, next) => {
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
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
    // console.log(person)
      if(person){
        response.json(person)
      }
      else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
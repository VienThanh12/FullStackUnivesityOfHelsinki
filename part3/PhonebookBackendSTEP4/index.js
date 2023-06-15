const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,  
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/info', (request, response) => {
  //response.send(persons)
  const date = new Date()
  let day = date.toLocaleString('en-us', { weekday: 'long' });
  let month = date.toLocaleString('en-us', { month: 'long' });
  response.send(
  `<p>Phonebook has information for ${persons.length} people</p> 
  <p> ${date} </p>`
  )
  console.log(date)
})

app.get('/info/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if(person != null) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/info/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

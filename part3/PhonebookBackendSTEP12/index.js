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


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
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

const generatedID = () => {
  return Math.floor(Math.random() * 1000) + 1;
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const checkName = persons.find(person => person.name === body.name)
  //console.log(checkName)
  if(!body.name || !body.number || checkName){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    id: generatedID(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})

app.get('/info/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if(person) {
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

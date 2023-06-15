const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


app.get('/', (request, response) => {
  response.send('<h1>Hello !</h1>')
})


app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.get('/api/notes', (request, response) => {
  response.json(notes) 
})

const generatedID = () => {
  let maxID = 0
  for(let i = 0; i < notes.length; i++){
    maxID = Math.max(maxID, notes[i].id)
  }
  return maxID + 1
}
app.post('/api/notes', (request, response) => {
  const body = request.body
  if(!body.contet){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  //console.log(false || false)
  const note = {
    content: body.content,
    important: body.important || false,
    id: generatedID()
  }
  notes = notes.concat(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

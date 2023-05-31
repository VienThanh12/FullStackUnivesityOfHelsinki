import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

promise.then(response => {
  console.log(response)
})
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})


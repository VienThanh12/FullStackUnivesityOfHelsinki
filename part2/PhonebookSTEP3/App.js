import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      num: '040-1234567',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const addNote = (event) =>{
    event.preventDefault()
    const NameObject = {
      name: newName,
      num: newNum,
      id: persons.length + 1
    }
    setPersons(persons.concat(NameObject))
    setNewName('')
    setNewNum('')
  }
  const handPersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handNumberChange = (event) => {
    setNewNum(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addNote}>
        <div>
          name: <input 
          onChange = {handPersonChange}
          />
        </div>
        <div> 
          number: <input
          onChange = {handNumberChange}
          />
        </div>  
        <div>
          <button type = "submit"> add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {
          persons.map(persons => <p key = {persons.id} > {persons.name} {persons.num}</p>)
        }
      </p>
    </div>
  )
}

export default App

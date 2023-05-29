import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addNote = (event) =>{
    event.preventDefault()
    const NameObject = {
      name: newName,
    }
    setPersons(persons.concat(NameObject))
    setNewName('')

  }
  const handPersonChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h3>Phonebook</h3>
      <form onSubmit = {addNote}>
        <div>
          name: <input 
          onChange = {handPersonChange}
          />
        </div>
        <div>
          <button type = "submit"> add </button>
        </div>
      </form>
      <h3>Numbers</h3>
      <p>
        {
          persons.map(persons => <p> {persons.name} </p>)
        }
      </p>
    </div>
  )
}

export default App

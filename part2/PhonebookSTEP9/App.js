import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import personService from './services/persons'
const Filter = ({handFilterNameChange}) => {
  return (
    <form>
        <div>
          filter shown with <input
          onChange = {handFilterNameChange}
          />
        </div>
    </form>
  )
}

const PersonForm = ({addNote, handPersonChange, handNumberChange}) => {
  return(
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
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(persons => persons.name.includes(filterName.toLowerCase()))
  
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
    setFilterName('')
  }
  const handPersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handNumberChange = (event) => {
    setNewNum(event.target.value)
  }
  const handFilterNameChange = (event) => {
    setFilterName(event.target.value) 
  }
  const removeID = (id) => {
    const peronsRemove = persons.find(persons => persons.id === id)
    if (window.confirm(`Delete ${peronsRemove.name}`)) {
      personService
        .remove(id)
        .then(() => {
          const updatePersons = persons.filter(persons => persons.id !== id)
          setPersons(updatePersons)
        })
        .then((data) => data)
    }
  }
  return (
    <div>
      <h2> Phonebook </h2>
      <Filter handFilterNameChange = {handFilterNameChange}/>
      <h3>add a new</h3>

      <PersonForm addNote={addNote} handPersonChange = {handPersonChange} handNumberChange = {handNumberChange}/>
      <h3>Numbers</h3>
      <p>
        {
          personsToShow.map(persons => 
            <Persons
              key = {persons.id}
              persons = {persons}
              remove = {() => removeID(persons.id)}
            />
          )
        }
      </p>
    </div>
  )
}

export default App 

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
const Message = ({message}) => {
  if(message !== null)
    return (
      <p className='message'> {message} </p>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  
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
      var ok = true, id = 0
      console.log(persons.length)
      for(var i = 0; i < persons.length; i++){
        
        if(persons[i].name === newName){
          ok = false
          id = persons[i].id
        }
      }
      console.log(id)
      
      if(ok === false){
        const person = persons.find(n => n.id === id)
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one`)) {
          const changedPerson = {...person, number: newNum}
          console.log(newNum)
          personService
            .update(id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            })
            .then((data) => {
              setMessage(`Added ${newName}`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
        }
      }
      else
      if(ok === true){
        const NameObject = {
          name: newName,
          number: newNum,
          id: persons.length + 1
        }
      personService
        .create(NameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
        })
        .then((data) => {
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    event.target.value = ""
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
      <Message message = {message}/>
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

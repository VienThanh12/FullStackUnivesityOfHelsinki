import { useState, useEffect } from 'react'
import axios from 'axios'
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

const Persons = ({persons, personsToShow}) => {
  return (
    <p>
        {
          personsToShow.map(persons => <p key = {persons.id} > {persons.name} {persons.num}</p>)
        }
    </p>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter(persons => persons.name.includes(filterName.toLowerCase()))
  
  console.log(personsToShow)
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
  return (
    <div>
      <h2> Phonebook </h2>
      <Filter handFilterNameChange = {handFilterNameChange}/>
      <h3>add a new</h3>

      <PersonForm addNote={addNote} handPersonChange = {handPersonChange} handNumberChange = {handNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons = {persons} personsToShow = {personsToShow} />
    </div>
  )
}

export default App

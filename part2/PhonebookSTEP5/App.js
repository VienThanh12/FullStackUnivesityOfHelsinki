import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456', id: 1 },
    { name: 'Ada Lovelace', num: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', num: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', num: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  
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

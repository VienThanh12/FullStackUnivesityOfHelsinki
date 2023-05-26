import { useState } from 'react'

const name = []
function Check(x){
  for(var i = 0; i < name.length; i++)
    if(JSON.stringify(name[i]) === JSON.stringify(x)){
      return false
    }
  return true
}
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

    if(Check(NameObject.name) == true){
      setPersons(persons.concat(NameObject))
      name.push(NameObject.name)
    }
    else if(Check(NameObject.name) == false)
      alert(`${NameObject.name} is already added to phonebook`)
    
    setNewName('')
  }
  const handPersonChange = (event) => {
    setNewName(event.target.value)
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
          <button type = "submit"> add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {
          persons.map(persons => <p> {persons.name} </p>)
        }
      </p>
    </div>
  )
}

export default App

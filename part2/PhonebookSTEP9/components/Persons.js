import persons from "../services/persons"

const Persons = ({persons, remove}) => { 
  return (
    <p>
      {persons.name} {persons.number}
      {} <button onClick = {remove}> delete </button>
    </p>
  )
}
export default Persons

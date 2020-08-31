import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

const Persons = (props) => {
  let filteredPersons
  if (props.filterValue.length > 0) {
    filteredPersons = props.persons.filter(person => 
      person.name.toLowerCase().includes(props.filterValue.toLowerCase()))
    return (
      <div>
        <ul>
          {filteredPersons.map(person => 
            <Person name={person.name} number={person.number} />
          )}          
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {props.persons.map(person => 
            <Person name={person.name} number={person.number} />
          )}
        </ul>
      </div>
    )    
  }
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>name: <input value={props.nameValue} onChange={props.nameOnChange}/></div>
      <div>number: <input value={props.numberValue} onChange={props.numberOnChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter = (props) => {
  return(
    <form>
      <div>
        filter show with <input value={props.filterValue} onChange={props.filterOnChange}/>
      </div>
    </form>
  )
}

        
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    var check = persons.find(person => {
      return person.name === newName
    })
    
    if (check!==undefined) {
      event.preventDefault()
      window.alert(`${newName} is already added to phonebook`)
    } else {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }   
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterOnChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} 
        nameValue={newName} nameOnChange={handlePersonChange} 
        numberValue={newNumber} numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={newFilter}/>
    </div>
  )

}

export default App
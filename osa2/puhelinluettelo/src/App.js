import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number} <button id={props.id} value={props.name} onClick={props.deletePerson}>delete</button>
    </div>
  )
}

const Notification = ({ notification, type }) => {
  if (notification===null) {return null}
  return (
    <div className={type}>
      {notification}
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
          {filteredPersons.map((person,i) => 
            <Person key={i} name={person.name} number={person.number} deletePerson={props.deletePerson} id={person.id}/>
          )}          
        </ul>
      </div>
    )
  } else {
    return (      
      <div>
        <ul>
          {props.persons.map((person,i) => 
            <Person key={i} name={person.name} number={person.number} deletePerson={props.deletePerson} id={person.id}/>
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
  const [ notifications, setNotifications ] = useState(null)
  const [ notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    var check = persons.find(person => {
      return person.name === newName
    })
    
    if (check!==undefined) {
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(personObject)
        personService
          .update(check.id, personObject)
          .then(response => {
            personService
              .getAll()
              .then(newPersons => {
                setPersons(newPersons)
                setNewName('')
                setNewNumber('')
                setNotifications(`${personObject.name} number updated`)
                setNotificationType('normal')
                setTimeout(() => {
                  setNotifications(null)
                  setNotificationType(null)}, 5000)
              })
          }).catch(error => {
            setNotifications(`Information of ${personObject.name} has already been removed from server`)
            setNotificationType('error')
            setTimeout(() => {
              setNotifications(null)
              setNotificationType(null)}, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotifications(`${personObject.name} added to phonebook`)
          setNotificationType('normal')
          setTimeout(() => {
            setNotifications(null)
            setNotificationType(null)}, 5000)
        })
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

  const deletePerson = (event) => {
    const name = event.target.value
    
    if (window.confirm(`Delete ${name}?`)){
      personService
        .remove(event.target.id)
        .then(response => {
          personService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
            setNotifications(`${name} removed from phonebook`)
            setNotificationType('normal')
            setTimeout(() => {
              setNotifications(null)
            }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterOnChange={handleFilterChange}/>
      <Notification notification={notifications} type={notificationType} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} 
        nameValue={newName} nameOnChange={handlePersonChange} 
        numberValue={newNumber} numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={newFilter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
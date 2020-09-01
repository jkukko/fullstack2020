import React from 'react'
import Person from './Person'


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

export default Persons
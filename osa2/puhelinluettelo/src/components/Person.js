import React from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number} <button id={props.id} value={props.name} onClick={props.deletePerson}>delete</button>
    </div>
  )
}

export default Person
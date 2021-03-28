import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import '../App.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const errorStyle = {
    border: '5px solid red',
    borderWidth: 1,
    padding: 10,
  }

  const successStyle = {
    border: '5px solid green',
    borderWidth: 1,
    padding: 10,
  }
  

  return (
    <div>
      {!notification ? null : 
        <div style={notification[1] === false ? successStyle : errorStyle}>
          {notification}
        </div>
      }
    </div>
  )
}

export default Notification
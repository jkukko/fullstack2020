
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const content = useSelector(state => state.notification)
  const style = {
    display: content === null ? 'none' : '',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      <div style={style}>
        {content}
      </div>
    </div>
  )
}

export default Notification
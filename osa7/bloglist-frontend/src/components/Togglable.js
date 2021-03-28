import React, { useState, useImperativeHandle } from 'react'
import { 
  Button,
  Box
 } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Box pt={2}>
          <Button variant="contained" color="secondary" onClick={toggleVisibility}>cancel</Button>
        </Box>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
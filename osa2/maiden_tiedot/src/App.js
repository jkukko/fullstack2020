import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("response.data",response.data)
        setCountries(response.data)
      })
  },[])
    
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App;

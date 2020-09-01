import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  return(
    <div>{props.country.name} <Button text="show" selectedCountry={props.country.name} country={props.country}/></div>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => SpecificCountry(props.country)}>{props.text}</button>
  )
}

const SpecificCountry = (props) => {
  console.log(props)
  return(
    <div>
      <h2>{props.name}</h2>
      <div>capital {props.capital}</div>
      <div>population {props.population}</div>
      <h3>languages</h3>
      {props.languages.map((languages, i) => <li key={i}>{languages.name}</li>)}
      <div><img src={props.flag} width='15%' alt='country flag'/></div>
    </div>
  )
}

const Countries = (props) => {

  const filteredCountries = props.countries.filter(country => {
    if (props.filterValue.length > 0) {
      return country.name.toLowerCase().includes(props.filterValue.toLowerCase())
    } else {
      return true
    }
  })
  
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches (matches: {filteredCountries.length}), specify another filter
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
          {filteredCountries.map((country, i) => 
            <SpecificCountry key={i} name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag}/>
          )}
      </div>
    )
  } else {
    return (
      <div>
          {filteredCountries.map((country, i) => 
            <Country key={i} country={country} />
          )}
      </div>
    )
  }
}

const Filter = (props) => {
  return (
    <div>
      find countries: <input value={props.filterValue} onChange={props.filterOnChange} />
    </div>
  )
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("response.data",response.data)
        setCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  const selectCountry = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filterValue={newFilter} filterOnChange={handleFilterChange} />
      <Countries countries={countries} filterValue={newFilter} />
    </div>
  )
}

export default App;

import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = ({newSearch, handleSearchChange}) => {
  return (
    <div>
      find countries {<input value={newSearch} onChange={handleSearchChange}/>}
    </div>
  )
}

const Search = ({countries,newSearch}) => {
  const lowerSearch = newSearch.toLowerCase()
  if (newSearch === ''){
    return <div>enter a search!</div>
  }
  const countriesMatched = countries.filter(country => country.name.common.toLowerCase().includes(lowerSearch))
  if (countriesMatched.length > 10){
    return (<div>Too many matches, specify another filter</div>)
  }

  return (
    countriesMatched.map(country => <p>{country.name.common}</p>)
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
    
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }

  useEffect(hook,[])

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <FindCountries newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <Search countries={countries} newSearch={newSearch}/>
    </div>
    
  )
  
}

export default App;

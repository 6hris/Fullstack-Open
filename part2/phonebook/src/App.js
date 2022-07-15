import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'
 

const PersonForm = ({addName,newName, newNumber, handleNameChange,handleNumberChange}) => (
  <form onSubmit={addName}>
  <div>
    name: <input value={newName} onChange={handleNameChange}/>
  </div>
  <div>
    number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Delete = ({persons, setPersons, person, setSuccessMessage}) => {
    
  return (
       <button onClick={() =>{
        if (window.confirm(`Are you sure you want to delete ${person.name}`)){
          axios.delete(`http://localhost:3001/persons/${person.id}`)
          setPersons(persons.filter(p => p.id !== person.id))
          setSuccessMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          },5000)
        }
        }} >delete</button>

)

  
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
 
  return (
    <div className='success'>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(personData => {
        setPersons(personData)
      })
      

  }

  useEffect(hook,[])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkDuplicate = persons.some(element => {
      if (element.name === personObject.name){
        return true;
      }

      return false;
    })

    if (checkDuplicate){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

      setSuccessMessage(`Added ${personObject.name}`)

      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }

  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }

  const DisplayNumbers = () => {
    if (newSearch === ''){
      return(persons.map(person => <p>{person.name} {person.number} <Delete persons={persons} setPersons={setPersons} person={person} setSuccessMessage={setSuccessMessage} successMessage={successMessage}/></p>)) 
    } else {

      const filteredList = persons.filter(person => person.name.includes(newSearch))
      return (
        filteredList.map(person => <p>{person.name} {person.number} <Delete persons={persons} setPersons={setPersons} person={person} setSuccessMessage={setSuccessMessage} successMessage={successMessage}/></p>)
      )
     
    }
    
  }
   
   
     
  




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <div>
        filter shown with <input value={newSearch} onChange={handleSearchChange}/>
      </div>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <DisplayNumbers />
      
    </div>
  )
}

export default App
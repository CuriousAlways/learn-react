import axios from 'axios';
import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PersonService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name:'', number: ''});
  const [searchTerm, setSearchTerm] = useState('');

  function isNameAlreadyPresent(){
    return persons.map((person)=>person.name).includes(newPerson.name);
  }

  function searchTermInputHandler(event) {
    setSearchTerm(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    let newName = newPerson.name;

    if(isNameAlreadyPresent()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    PersonService
    .createPerson(newPerson)
    .then((newPersonkData) => {
      setPersons([...persons, newPersonkData]);
      setNewPerson({name:'', number: ''});
    });
  }

  function nameInputHandler(event) {
    setNewPerson({...newPerson, name: event.target.value});
  }

  function numberInputHandler(event) {
    setNewPerson({...newPerson, number: event.target.value});
  }

  function destroyHandler(person) {
    const confirmDeletion = window.confirm(`Delete ${person.name}`);

    if(!confirmDeletion) {
      return;
    }

    PersonService
    .destroyPerson(person.id)
    .then(() => {
      let updatedPerson = persons.filter((p) => p.id !== person.id);

      setPersons(updatedPerson);
    });
  }

  /* Effects */
  useEffect(()=>{
    PersonService
      .getPerson()
      .then((personsData)=>{
        setPersons(personsData);
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} onChange={searchTermInputHandler}/><br/>
      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} onSubmit={submitHandler} onNameInput={nameInputHandler} onNumberInput={numberInputHandler} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} onDelete={destroyHandler} />
    </div>
  )
}


export default App;

import axios from 'axios';
import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import PersonService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name:'', number: ''});
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  function isNameAlreadyPresent(){
    return persons.map((person)=>person.name).includes(newPerson.name);
  }

  function searchTermInputHandler(event) {
    setSearchTerm(event.target.value);
  }

  function notifyUser(msg, type) {
    setMessage({ text: msg, type: type });
    setTimeout(()=>{setMessage(null)}, 2000);
  }

  function updatePerson() {
    let person = persons.find((person) => person.name === newPerson.name)
    let updatedPerson = {...person, number: newPerson.number};

    PersonService
      .updatePerson(person.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) =>{
          if(p.id===returnedPerson.id) {
            return returnedPerson;
          }

          return p;
        }));
        notifyUser(`${updatePerson.name} updated successfully`, 'success');
      })
      .catch((reason) => {
        notifyUser(`${person.name} already removed from server`, 'failure');
      })

  }

  function createPerson() {
    PersonService
    .createPerson(newPerson)
    .then((newPersonkData) => {
      setPersons([...persons, newPersonkData]);
      notifyUser(`${newPerson.name} created successfully`, 'success');
      setNewPerson({name:'', number: ''});
    });

  }

  function submitHandler(event) {
    event.preventDefault();

    if(isNameAlreadyPresent()) {
      let confirmUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace old number with new number`);

      if(!confirmUpdate) {
        return;
      }

      updatePerson();
      return;
    }

    createPerson();
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
      notifyUser(`${person.name} deleted successfully`, 'success');
    })
    .catch((reason) => {
      notifyUser(`${person.name} already removed from server`, 'failure');
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
      { message !== null && <Notification message={message} /> }
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

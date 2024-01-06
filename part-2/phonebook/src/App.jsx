import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 },
                                          { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
                                          { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
                                          { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]);
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

    setPersons([...persons, newPerson]);
    setNewPerson({name:'', number: ''})
  }

  function nameInputHandler(event) {
    setNewPerson({...newPerson, name: event.target.value});
  }

  function numberInputHandler(event) {
    setNewPerson({...newPerson, number: event.target.value});
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} onChange={searchTermInputHandler}/><br/>
      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} onSubmit={submitHandler} onNameInput={nameInputHandler} onNumberInput={numberInputHandler} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}


export default App;

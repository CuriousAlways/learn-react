import { useState } from 'react'

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

  function filteredPerson() {
    if(searchTerm.length === 0) {
      return persons;
    }

    return persons.filter((person)=> person.name.toLocaleLowerCase().includes(searchTerm));
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
      <div>
        filtered shown with: <input value={searchTerm} onChange={searchTermInputHandler} />
      </div><br/>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newPerson.name} onChange={nameInputHandler}/>
        </div>
        <div>
          number: <input value={newPerson.number} onChange={numberInputHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPerson().map((person)=> <Person person={ person } key={person.name} />)}
      </div>
    </div>
  )
}

const Person = ({person}) => {
  return (
    <p>{ person.name }</p>
  )
}

export default App;

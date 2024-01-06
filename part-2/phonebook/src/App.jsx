import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newPerson, setNewPerson] = useState({name:'', number: ''});

  function isNameAlreadyPresent(){
    return persons.map((person)=>person.name).includes(newPerson.name);
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
        {persons.map((person)=> <Person person={ person } key={person.name} />)}
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

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  function submitHandler(event) {
    event.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName('')
  }

  function inputHandler(event) {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={inputHandler}/>
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

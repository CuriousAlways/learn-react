const Persons = ({persons, searchTerm, onDelete}) =>{

  function filteredPerson() {
    if(searchTerm.length === 0) {
      return persons;
    }

    return persons.filter((person)=> person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

  return (
    <div>
      {filteredPerson().map((person)=> <Person person={ person } key={person.name} onClick={onDelete}/>)}
    </div>
  );
}

const Person = ({person, onClick}) => {
  return (
    <p>
      { person.name } { person.number}
      <button onClick={() => onClick(person)}>delete</button>
    </p>
  )
}

export default Persons;

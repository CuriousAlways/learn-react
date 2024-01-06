const Persons = ({persons, searchTerm}) =>{

  function filteredPerson() {
    if(searchTerm.length === 0) {
      return persons;
    }

    return persons.filter((person)=> person.name.toLocaleLowerCase().includes(searchTerm));
  }

  return (
    <div>
      {filteredPerson().map((person)=> <Person person={ person } key={person.name} />)}
    </div>
  );
}

const Person = ({person}) => {
  return (
    <p>{ person.name }</p>
  )
}

export default Persons;

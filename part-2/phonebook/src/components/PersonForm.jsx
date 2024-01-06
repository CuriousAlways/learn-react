const PersonForm = ({newPerson, onNameInput, onNumberInput, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newPerson.name} onChange={onNameInput}/>
      </div>
      <div>
        number: <input value={newPerson.number} onChange={onNumberInput}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;

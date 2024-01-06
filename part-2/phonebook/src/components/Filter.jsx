const Filter = ({searchTerm, onChange}) => {
  return (
    <div>
      filtered shown with: <input value={searchTerm} onChange={onChange} />
    </div>
  )
}

export default Filter;

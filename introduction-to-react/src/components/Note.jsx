const Note = ({ note, toggleImportanceOf }) => {
  const buttonText = note.important ? 'Mark not important' : 'Mark important';

  return (
    <li className="note">
      {note.content}
      <button onClick={() => toggleImportanceOf(note.id)}>{buttonText}</button>
    </li>
  )
}

export default Note

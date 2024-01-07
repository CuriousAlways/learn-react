import noteService from './services/notes';
import { useEffect, useState } from 'react';
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  // execute effect to fetch notes when this component mounts
  useEffect(()=>{
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes));
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })

    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then((response)=>{
    //     console.log(response);
    //     setNotes(notes.concat(response.data));
    //     setNewNote('');
    //   })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    let url = `http://localhost:3001/notes/${id}`;
    let note = notes.find(n => n.id === id );
    let updatedNote = { ...note, important: !note.important }

    noteService
      .update(id, updatedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => {
          if(note.id === returnedNote.id) {
            return returnedNote;
          }
          return note;
        }))
      })

    // axios
    //   .put(url, updatedNote)
    //   .then((response) => {
    //     console.log(response);
    //     setNotes(notes.map((note) => {
    //       if(note.id === response.data.id) {
    //         return response.data;
    //       }
    //       return note;
    //     }))
    //   })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportanceOf={toggleImportanceOf} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App

import noteService from "./services/notes";
import { useEffect, useState, useRef } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Toggalable from "./components/Toggalable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const toggelableRef = useRef();

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  // execute effect to fetch notes when this component mounts
  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const addNote = (note) => {
    // let mock api calls are successful
    setNotes((notes || []).concat(note));
    // noteService.create(note).then((returnedNote) => {
    //   setNotes(notes.concat(returnedNote));
    // });

    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then((response)=>{
    //     console.log(response);
    //     setNotes(notes.concat(response.data));
    //     setNewNote('');
    //   })

    // HIDE FORM AFTER SUBMIT
    // toggelableRef.current.toggleVisibility();
    toggelableRef.current.whitelistedMethod();
  };

  const toggleImportanceOf = (id) => {
    let url = `http://localhost:3001/notes/${id}`;
    let note = notes.find((n) => n.id === id);
    let updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then((returnedNote) => {
        setNotes(
          notes.map((note) => {
            if (note.id === returnedNote.id) {
              return returnedNote;
            }
            return note;
          })
        );
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });

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
  };

  /****** Some dummy method which does nothing */
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login form submitted");
  };

  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <Toggalable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Toggalable>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow?.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportanceOf={toggleImportanceOf}
          />
        ))}
      </ul>
      <Toggalable buttonLabel="add new Note" ref={toggelableRef}>
        <NoteForm createNote={addNote} />
      </Toggalable>
      <Footer />
    </div>
  );
};

export default App;

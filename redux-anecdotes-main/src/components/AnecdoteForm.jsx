import { addAnecdote } from "../reducers/anecdoteReducer";
// import { createNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContextProvider";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [_, notificationDispatcher] = useContext(NotificationContext);

  const newAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.newNote.value;
    event.target.newNote.value = "";
    dispatch(addAnecdote(content));
    notificationDispatcher({
      type: "CREATE",
      payload: `you created '${content}'`,
    });
    // remove notification after 5 seconds
    setTimeout(() => {
      notificationDispatcher({ type: "CREATE", payload: "" });
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="newNote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

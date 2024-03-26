import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
// import { createNotification } from "../reducers/notificationReducer";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContextProvider";

const AnecdoteList = () => {
  const [notification, notificationDispatcher] =
    useContext(NotificationContext);

  const anecdotes = useSelector((state) => {
    let notes = state.anecdotes;
    let searchTerm = state.searchTerm;
    if (!searchTerm) {
      return notes;
    }

    return notes.filter((note) =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const dispatch = useDispatch();

  const sortByVote = (anecdotes) => {
    return anecdotes.toSorted(
      (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes
    );
  };

  const sortedAnectodes = sortByVote(anecdotes);

  const vote = (id) => {
    let anecdote = sortedAnectodes.find((item) => item.id == id);
    dispatch(upvoteAnecdote(id));
    // dispatch(createNotification(`you upvoted '${anecdote.content}'`));
    notificationDispatcher({
      type: "CREATE",
      payload: `you upvoted '${anecdote.content}'`,
    });
    setTimeout(() => {
      // dispatch(createNotification(""));
      notificationDispatcher({ type: "CREATE", payload: "" });
    }, 5000);
  };

  return (
    <>
      {sortedAnectodes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

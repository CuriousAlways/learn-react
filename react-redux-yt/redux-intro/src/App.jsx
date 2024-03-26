import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

function App() {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>counter: {counter}</h1>
      <hr />
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      {isLogged && <h3>Information only visible to logged in users</h3>}
    </div>
  );
}

export default App;

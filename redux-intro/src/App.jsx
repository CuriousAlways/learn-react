import { createStore } from "redux";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(countReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

function App() {
  return (
    <>
      <div>{store.getState()}</div>
      <div>
        <button
          onClick={() => {
            store.dispatch({ type: "INCREMENT" });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: "ZERO" });
          }}
        >
          0
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: "DECREMENT" });
          }}
        >
          -
        </button>
      </div>
    </>
  );
}

export default App;

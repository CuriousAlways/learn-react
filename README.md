## Learn react

This repo contains my notes/solutions to [mooc.fi](https://fullstackopen.com) fullstack react course.

## Starting new react project

```bash
# npm = 7
npm create vite@latest <project-name> -- --template react
cd <project-name>
npm install
#start application with
npm run dev
# we can setup json-server to quickly spin a rest server
# no global insatall just need db.json file in root directory of project
npx json-server --port 3000 --watch db.json
```

## [Introduction to React](https://fullstackopen.com/en/part1/introduction_to_react)

- React applications are composed of components.
- First letter of React component names must be **capitalized** else react would assume its regular HTML tag.
- Information is passed b/w components via props

```js
// Hello component
const Hello = (props) => {
  return (
    <div>
      <p> Hello {props.name} </p>
    </div>
  )
}

exports default Hello;
```

> `props` are used to pass data b/w components.

> **component functions** are functions defined inside a component. advantage of this component function is that we don't have to explicitly pass any attributes it would have access to props.

```js
// component function
const Hello = (props) => {
  // Inside this componet function we can access props directly
  const bornYear = () => {    const yearNow = new Date().getFullYear()    return yearNow - props.age  }

  return (
    ...
  )
}
```

### Rendering lists

- to optimize ui rendering react expects a key when rendering a list.

```js
//...
const Users = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}> {user.name} </li>
      ))}
    </ul>
  );
};
//...
```

### `props.children`

- passes children of react component as array.

```js
// App.js
....
<Toggalable buttonLable='reveal'>
  <UserDetail name='raza', onClick={sendEmail} />
  <FriendList>
</Toggable>


// Toggalable.js
const Toggalable =  ({props, children}) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={()=>setVisible(true)}>{buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={()=>setVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}
```

## React hooks

---

> - hooks may only be called from the inside of a function body that defines a React.
> - hooks must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component

- ### [`useState`](https://react.dev/learn/state-a-components-memory)
  - This hook is used to maintain state of a react component.
  - When the value of state changes then components and its child is re-rendered
  - A component can have any number of `useState` hook

```js
import {useState} from 'react';

const Hello => () => {
  const [counter, setCounter] = useState(0);

  /****************************************************
   * changes counter value by one after 1s of its
   * execution which triggers re-render of this Hello
   * component. After this setTimeOut is executed once
   * again to update counter value after 1sec and this
   * loop continues infinetly......
   ***************************************************/
  setTimeOut(()=> setCounter(counter + 1), 1000)

  return (<div> { counter } </div>);
}
```

- `useState` returns array with 2 element, 1st is element with current value and 2nd element is function to update state. **NEVER UPDDATE DIRECTLY ALWAYS USE STATE UPDATE FUNCTION TO UPDATE STATE BY SETTING THE STATE TO NEW OBJECT**.

```js
import { useState } from "react";
//....
const [counter, setCounter] = useState({ left: 0, right: 1 });
//....

// INVALID way of updating state
// counter.left++;
// setCounter(counter)

// VALID
newCounter = { left: counter.left + 1, right: counter.right };
setCounter(newCounter);
// Alternative
setCounter({ ...counter, left: counter.left + 1 });

//....
```

- ### [useEffect](https://react.dev/learn/synchronizing-with-effects)

  - Effects lets specify side effects that are caused by rendering itself, rather than by a particular event
  - steps to specify effect:

  1. Declare an effect

  ```js
  import { useEffect } from "react";

  //... other component stuff
  useEffect(() => {
    // things to happen within effect
  });
  ```

  2. specify effect dependency. By default effect executes after every render. So, it becomes important to specify dependency which dictates when effect should execute. We can specify dependency as array, react will only skip running effect if **all** the dependency are **unchanged** since previous render.

  ```js
  useEffect(() => {
    // This runs after every render
  });

  useEffect(() => {
    // This runs only on mount (when the component appears)
  }, []);

  useEffect(() => {
    // This runs on mount *and also* if either a or b have changed since the last render
  }, [a, b]);
  ```

  3. add clean up if needed

- ### [useRef](https://react.dev/learn/referencing-values-with-refs)
  - It allows to store a value, which can be modified but unlike state it does not trigger re-render on value change
  - `ref` is a plain JavaScript object with the current property that you can read and modify
  - `refs` are retained by React between re-renders
  - **Treat refs as an escape hatch**. Refs are useful when you work with external systems or browser APIs. If much of your application logic and data flow relies on refs, you might want to rethink your approach.
  - **Don’t read or write ref.current during rendering.** If some information is needed during rendering, use state instead. Since React doesn’t know when ref.current changes, even reading it while rendering makes your component’s behavior difficult to predict. (The only exception to this is code like `if (!ref.current) ref.current = new Thing()` which only sets the ref once during the first render.)

```jsx
import { useRef } from "react";

export default function Counter() {
  // this returns an object { current: 0}
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert("You clicked " + ref.current + " times!");
  }

  return <button onClick={handleClick}>Click me!</button>;
}
```

- `ref` are useful for follwoing situations:

  - Storing timeout IDs
  - [Storing and manipulating DOM elements, which we cover on the next page](https://react.dev/learn/manipulating-the-dom-with-refs)
  - Storing other objects that aren’t necessary to calculate the JSX.

- ### [forwardRef](https://react.dev/reference/react/forwardRef)
  - it lets component receive a `ref` and forward its ref to one of its child component

```js
  //MyInput.jsx
  const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />;
  });

  //App.jsx
  const App = () => {
    const inputRef = useRef();

    function handleClick() {
      console.log(inputRef)
      inputRef.current.focus();
    }
    // ....
    return (
      // .....
      <MyInput ref={inputRef}>
      <button onClick={handleClick}>
        Focus the input
      </button>
    )
  }
```

> ### This is how it works:
>
> - `<MyInput ref={inputRef} />` tells React to put the corresponding DOM node into `inputRef.current`. However, it’s up to the MyInput component to opt into that—by default, it doesn’t.
> - The `MyInput` component is declared using `forwardRef`. **This opts it into receiving the inputRef from above as the second ref argument which is declared after props.**
> - MyInput itself passes the ref it received to the `<input>` inside of it.

- ### useReducer

  - Its state management solution provided by react similar to redux.

  ```js
  /********************************************
   * counterReducer.js
  ********************************************/
  const counterReducer = (state, action) => {
    switch(action.type) {
      case 'INCREMENT': return state + 1;
      case 'DECREMENT': return state - 1;
      default: return 0;
    }
  }

  export default counterReducer;

  /******************************************
   * App.jsx
  ******************************************/
  import { useReducer } from 'react';
  import counterReducer from './counterReducer';

  const App = () => {
    const [counter, counterDispatch] = useReducer(counterReducer, 0);

    return (
      <div>
        <h1>{counter} </h1>
        <div>
          <button onClick={() => counterDispatch({type: "INCREMENT"})}> + </button>
          <button onClick={() => counterDispatch({type: "DECREMENT"})}> - </button>
        <div>
      </div>
    )
  }
  ```

# React Context Api

- It lets us teleport data from one part of component tree to any of its children(at any depth).
- It avoid having to pass prop from intermidiate component just so some data would be used somewhere down the component tree (`prop drilling`).
- steps to use context for accessing data
  - create and initialize context using `createContext`
  - wrap component whose children would need access to context data
  - access context value using `useContext` in the children

```js
/*************************************
 * create context
 * App.jsx
 ************************************/
import { createContext } from "react";

// create context with some initial/default value
const SecretContext = createContext("");

const App = () => {
  // wrap parent in context provider
  return (
    <SecretContext.Provider value="Very important random secret">
      <Parent1>
        <Children1>
          <Children2 />
        </Children1>
      </Parent1>
    </SecretContext.Provider>
  );
};

export default App;
export { SecretContext };

/***************************************
 * Chilren2.jsx
 **************************************/
import { useContext } from "react";
import { SecretContext } from "./App";

const Children2 = () => {
  const value = useContext(SecretContext);

  return <h1>{value}</h1>;
};
```

# Axios

- Its very common library used with react to make network requests.

```js
import axios from "axios";

const promise = axios.get("http://localhost:3001/notes");
console.log(promise);

const promise2 = axios.get("http://localhost:3001/foobar");
console.log(promise2);

promise.then((response) => {
  // do something after the promise is successfully fulfilled
  console.log(response.data);
});
```

# Redux

=============

### Intallation

```bash
# install redux toolkit
npm install @reduxjs/toolkit
npm install redux react-redux
```

## REDUX

- Redux is global state management tool.

```js

// ACTION -> it describes what we intend to do [A function that returns an object]
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

// REDUCER -> reducers describes how we want to handle different ACTIONS.
// in practice reducer is a function that takes a state and an action  and returns new state
const counter = (state=0, action) => {
  swtich(action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
  }
}

// STORE -> global object to store all data/state
let store = createStore(counter);

// DISPATCH -> it dispatches actions to reducers to manipulate values in store
store.dispatch(increment())


/******************************************
 * Overall flow of reducers
 * DISPATCH dispatches ACTION to REDUCERS
 * which describes how to handle the ACTION
 * which inturn updates STORE.
 *******************************************/
```

- Using newer react-redux toolkit reduces a lot of boiler plate that we have to write.

```js
// with redux toolkit
/*******************************************
 * create reducers and actions with create slice
 * counter_reducer.js
 *******************************************/
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducer: {
    function incrementAction(state, action) {
      return state + 1
    },
    function decrementAction(state, action) {
      return state - 1
    }
    function zeroAction(state, action) {
      return 0;
    }
  }
});

export const { incrementAction, decrementAction, zeroAction} = counterSlice.actions;
export default counterSlice.reducer;


/*******************************************************************
 * create store using reducers
 * store.js
 ******************************************************************/
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from 'counter_reducer.js';

const store = configureStore({
  reducers: {
    counter: counterReducer
  }
})

export default store;

/******************************************************************
 * wrap your app with store
 * main.jsx
 * ***************************************************************/
import { Provider } from "react-redux";
import store from 'store.js'
import App from 'App'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);


/****************************************************************
 * use store and dispatch actions to it in component
 * App.jsx
 * *************************************************************/
import {incrementAction, decrementAction, zeroAction} from 'counterReducer'
import {useDispatch, useSelector} from 'react-redux'

const App = () => {
  const counter = useSelector((state)=> state.counter);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={()=> useDispatch(incrementAction())}>+</button>
      {/*incrementAction() is same as {type: 'counter/incrementAction' } if it has any argument then it would have become its payload*/}
      <button onClick={()=> useDispatch(decrementAction())}>-</button>
      <button onClick={()=> useDispatch(zeroAction())}>0</button>
    </div>
  )
}
```

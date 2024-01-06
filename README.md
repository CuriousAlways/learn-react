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

> **component functions**  are functions defined inside a component. advantage of this component function is that we don't have to explicitly pass any attributes it would have access to props.

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
const Users = ({users}) => {
  return (
    <ul>
      {users.map((user) => <li key={user.id}> {user.name} </li>)}
    </ul>
  )
}
//...
```

## React hooks
>-  hooks may only be called from the inside of a function body that defines a React.
>- hooks must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component


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
import {useState} from 'react';
//....
  const [counter, setCounter] = useState({left: 0, right: 1});
  //....

  // INVALID way of updating state
  // counter.left++;
  // setCounter(counter)

  // VALID
  newCounter = { left: counter.left + 1, right: counter.right }
  setCounter(newCounter);
  // Alternative
  setCounter({...counter, left: counter.left + 1 })


//....
```

- ### [useEffect](https://react.dev/learn/synchronizing-with-effects)
  - Effects lets specify side effects that are caused by rendering itself, rather than by a particular event
  - steps to specify effect:
  1. Declare an effect
  ```js
  import { useEffect } from 'react';

  //... other component stuff
  useEffect(()=>{
    // things to happen within effect
  })
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


# Axios
- Its very common library used with react to make network requests.
```js
import axios from 'axios';

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

promise.then((response) => {
  // do something after the promise is successfully fulfilled
  console.log(response.data)})
```



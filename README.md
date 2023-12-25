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


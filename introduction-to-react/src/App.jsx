const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="raza"/>
      <Hello name={"ejaz"} />
      <Hello name={"farhan"} />
    </div>
  )
}

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p> Hello {props.name}! </p>
    </div>
  );
}

export default App

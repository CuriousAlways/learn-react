const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]



  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  return (
    <>
      <Parts part={props.parts[0]} />
      <Parts part={props.parts[1]} />
      <Parts part={props.parts[2]} />
    </>

  )
}

const Total = (props) => {
  let numberOfExercises = props.parts.reduce(
    (total, part)=> total + part.exercises,
    0);

  return (
    <p>Number of exercises {numberOfExercises}</p>
  );
}

const Parts = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

export default App

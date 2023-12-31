import Header from "./Header";
import Content from "./Content";
import ExcercisesCount from "./ExcercisesCount";

const Course = ({course}) => {
  const totalNoOfExcercise = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <ExcercisesCount excerciseCount={totalNoOfExcercise} />
  </div>
  );
}

export default Course;

import Parts from "./Parts";

const Content = ({parts}) => {
  return (
    <>
      { parts.map((part) => <Parts part={part} key={part.id} />) }
    </>

  )
}

export default Content;

import { useState } from "react";

const App = () => {
  const [leftCounter, setLeftCounter] = useState(0);
  const [rightCounter, setRightCounter] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  // setTimeout(()=> { setCounter(counter + 1) }, 1000);
  // const handleClick = () => {
  //   console.log('clicked...')
  // }

  // console.log('redering..', counter);

  // const increaseCounter = () => setCounter(counter + 1);
  // const decreaseCounter = () => setCounter(counter - 1);
  // const zeroCounter     = () => setCounter(0);

  const increaseLeftCounter = () => {
    setLeftCounter(leftCounter + 1);
    updateTotalClicks();
    setAllClicks(allClicks.concat('L'));
  }

  const increaseRightCounter = () => {
    setRightCounter(rightCounter + 1);
    updateTotalClicks();
    setAllClicks(allClicks.concat('R'));
  }

  const updateTotalClicks = () => {
    setTotalClicks(totalClicks + 1)
  }


  return (
    <div>
      <Display counter={leftCounter} />
      <Button text="plus left counter" onClick={increaseLeftCounter} />
      <Display counter={rightCounter} />
      <Button text="plus right counter" onClick={increaseRightCounter} />
      {/* <p> all clicks = { allClicks.join(', ')}</p> */}
      <History allClicks={allClicks} />
      <p> total clicks = {totalClicks} </p>
      {/* <Button text="zero" onClick={zeroCounter} /> */}
    </div>
  )
};

const Display = ({counter}) => {
  return <div>{counter}</div>;
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>;
}

const History = ({allClicks}) => {
  if(allClicks.length === 0) {
    return (<p>Application is used by pressing buttons</p>);
  }

  return (<p>Click History: {allClicks.join(', ')}</p>);

}


const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

export default App

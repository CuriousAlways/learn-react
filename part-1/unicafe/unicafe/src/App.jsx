import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodReviewHandler = () => setGood(good+1);
  const neutralReviewHandler = () => setNeutral(neutral + 1);
  const badReviewHandler = () => setBad(bad + 1);

  return (
  <div>
    <h2>Give feedback</h2>
    <div>
      <Button text='good' clickHandler={goodReviewHandler} />
      <Button text='neutral' clickHandler={neutralReviewHandler} />
      <Button text='bad' clickHandler={badReviewHandler} />
    </div>
    <Statistics good={good} bad={bad} neutral={neutral} />
  </div>
  );
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalReview = good + bad + neutral;
  if(totalReview === 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <p>No feedback given</p>
      </div>
    );
  }

  const averageScore = (good - bad)/ totalReview;
  const positiveReviewPercent = (good/totalReview) * 100;

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='average' value={averageScore} />
          <StatisticLine text='positives' value={positiveReviewPercent} />
        </tbody>
      </table>
    </div>
  );
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} </td>
    </tr>
  );
}

export default App;

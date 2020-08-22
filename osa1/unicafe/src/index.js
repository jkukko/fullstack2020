import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>  

const GiveFeedback = ({ setGood, setNeutral, setBad }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setGood} text='Good'/>
      <Button handleClick={setNeutral} text='Neutral'/>
      <Button handleClick={setBad} text='Bad'/>

    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad} = props
  const total = good + neutral + bad
  const ave = `${Math.round((good + (-1) * bad) / total * 10)}` / 10
  const goodPercentage = `${Math.round((good / total)*100)}%`
  
  if (total == 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  } else {  
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={ave} />
          <StatisticLine text='positive' value={goodPercentage} />
        </table>
      </div>
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <GiveFeedback
        setGood={() => setGood(good + 1)}
        setNeutral={() => setNeutral(neutral + 1)}
        setBad={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = ({ good, ok, bad }) => {

  const total_feedback = good + ok + bad
  const ave = `${Math.round((good + (-1) * bad) / total_feedback * 10)}` / 10
  const positive = `${Math.round((good / total_feedback)*100)}%`

  if(total_feedback === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
      <div>feedback given {total_feedback}</div>
      <div>average {ave}</div>
      <div>positive {positive}</div>
    </div>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <Statistics good={store.getState().good} ok={store.getState().ok} bad={store.getState().bad}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
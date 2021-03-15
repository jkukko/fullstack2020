import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import ConnectedFilter from './Filter'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
    console.log('vote', anecdote)
    props.vote(anecdote)
    props.setNotification(`you voted anecdote: ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
          </div>
          <button onClick={() => voteAnecdote(anecdote)}>vote</button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter(a => (a.content.toLowerCase().includes(state.filter.toLowerCase())))
    }
  }
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecadoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecadoteList
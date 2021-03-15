import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted anecdote: ${anecdote.content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).filter(a => 
      a.content.toLowerCase().includes(filterValue.toLowerCase())).map(anecdote => 
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

export default AnecdoteList
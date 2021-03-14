import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import AnecdoteForm from './AnecdoteForm'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
          </div>
          <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default AnecdoteList
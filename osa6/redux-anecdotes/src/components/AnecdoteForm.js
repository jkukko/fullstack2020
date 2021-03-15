import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added anecdote: ${content}`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote'></input>
                <button type='submuit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
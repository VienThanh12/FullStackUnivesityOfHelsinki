import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'Anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: getId(),
      })
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote 
      ) 
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, addVote , setAnecdotes, createAnecdote } = anecdoteSlice.actions


export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer


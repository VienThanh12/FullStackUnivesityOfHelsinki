import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { initializeAnecdote } from './reducers/anecdoteReducer'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const App = () => { 
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdote())
  }, [])
  return (
    <div>
      <h2> Anecdotes </h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App
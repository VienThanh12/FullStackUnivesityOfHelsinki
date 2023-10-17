import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote , updateAnecdote } from '../requests'
import Notification from '../components/Notification'

import axios from 'axios'
import { useReducer, useState } from 'react'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const [noti, notiDispatch] = useState('')

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation( createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
  })

  const addAnecdote = async (event) => {
    
    if(event.target.anecdote.value.length >= 5){
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content: content, votes: 0, id: getId()})

      notiDispatch(`anecdote '${content}' created`)
      setTimeout(() => {
      notiDispatch('')
      }, 5000)
    }
    else {
      event.preventDefault()
      notiDispatch(`too short anecdote, must have lenth 5 or more`)
      setTimeout(() => {
      notiDispatch('')
    }, 5000)
    }
  }

  return (
    <div>
      <Notification noti = {noti}/>
      <h3>create new</h3>
      <form onSubmit = {addAnecdote}>
        <input name = 'anecdote' />
        <button type = "submit"> create </button>
      </form>
    </div>
  )
}

export default AnecdoteForm

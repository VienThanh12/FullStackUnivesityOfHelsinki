import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote , updateAnecdote } from '../requests'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation( createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
  })

  const addAnecdote = async (event) => {
    console.log(event.target.anecdote.value.length)
    if(event.target.anecdote.value.length > 5){
      event.preventDefault()
      console.log("hi")
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, "votes": 0, id: getId()})
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit = {addAnecdote}>
        <input name = 'anecdote' />
        <button type = "submit"> create </button>
      </form>
    </div>
  )
}

export default AnecdoteForm

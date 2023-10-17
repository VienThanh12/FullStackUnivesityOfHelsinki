import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import axios from 'axios'

const App = () => {

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const updatedAnecdoteMutation = useMutation( updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
  })
  const handleVote = async (anecdote) => {
    console.log(anecdote)
    updatedAnecdoteMutation.mutate( {content: anecdote.content, votes: anecdote.votes + 1, id: anecdote.id} )
  }

  //console.log(JSON.parse(JSON.stringify(result)))
  if ( result.isLoading ) {
    return <div> anecdote service not available due to problems in server </div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key = {anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

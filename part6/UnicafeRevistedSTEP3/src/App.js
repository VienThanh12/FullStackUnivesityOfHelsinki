import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
const App = () => {
  const anecdotes = useSelector(state => state) // useSelector receives a function as a parameter. The function either searches for or selects data from the Redux store.
  const dispatch = useDispatch()  // This allows all components to make changes to the state of the Redux store.

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key = {anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2> create new </h2>
      <form>
        <div> <input /> </div>
        <button> create </button>
      </form>
    </div>
  )
}

export default App
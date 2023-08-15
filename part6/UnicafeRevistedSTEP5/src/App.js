import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnecdote } from './reducers/anecdoteReducer'



const App = () => {
  const anecdotes = useSelector(state => state) // useSelector receives a function as a parameter. The function either searches for or selects data from the Redux store.
  const dispatch = useDispatch()  // This allows all components to make changes to the state of the Redux store.
  const swap = (i, j) => {
    var temp = anecdotes[i]
    anecdotes[i] = anecdotes[j]
    anecdotes[j] = temp
  }
  for(var i = 0; i < anecdotes.length; i++){
    for(var j = i + 1; j < anecdotes.length; j++){
      if(anecdotes[i].votes < anecdotes[j].votes){
        swap(i, j)
      }
    }
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const createContent = (event) => {
    event.preventDefault()
    const content = event.target.newContent.value
    event.target.newContent.value = ''
    dispatch(addAnecdote(content))
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
      <form onSubmit = {createContent}>
        <div> <input name = "newContent"/> </div>
        <button type = "submit"> create </button>
      </form>
    </div>
  )
}

export default App
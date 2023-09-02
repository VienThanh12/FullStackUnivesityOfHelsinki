import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {  
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
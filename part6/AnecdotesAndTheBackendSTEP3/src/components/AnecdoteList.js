import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notiVote , reset5 } from '../reducers/notiReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.filter(n => n.content.toString().includes(state.filter))) // useSelector receives a function as a parameter. The function either searches for or selects data from the Redux store.
    //const anecdotes = anecdote.filter(n => n.content.toString().includes())
    //console.log(anecdotes)
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
        dispatch(addVote(id))
        const t = anecdotes.find(anecdote => anecdote.id === id)

        //console.log(t)
        dispatch(notiVote(`'${t.content}'`))
        setTimeout(() => {
          dispatch(reset5())
        }, 5000)
    }
    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key = {anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}> vote </button>
              </div>
            </div>
          )}
        </div>
      )
}
export default AnecdoteList
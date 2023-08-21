import { useDispatch } from "react-redux"
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const createContent = (event) => {
        event.preventDefault()
        const content = event.target.newContent.value
        event.target.newContent.value = ''
        dispatch(addAnecdote(content))
    }
    return (
        <div>
            <h2> create new </h2>
            <form onSubmit = {createContent}>
                <div> <input name = "newContent"/> </div>
                <button type = "submit"> create </button>
            </form>
        </div>
    )
}

export default NewAnecdote
import { useDispatch } from "react-redux"
import { createAnecdote} from '../reducers/anecdoteReducer'
import { notiCreate, reset5 } from '../reducers/notiReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const createContent = async (event) => {
        event.preventDefault()
        const content = event.target.newContent.value
        event.target.newContent.value = ''
        dispatch(notiCreate(`'${content}'`))
        setTimeout(() => {
            dispatch(reset5())
        }, 5000)
        dispatch(createAnecdote(content))
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
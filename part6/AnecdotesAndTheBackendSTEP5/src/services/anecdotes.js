import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdote = async (content) => {
  const object = {content, votes: 0, id: getId()}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id, anecdote) => {
  console.log(id)
  console.log(anecdote)
  const newContent = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id
  }
  const response = await axios.put(`${baseUrl}/${id}`, newContent)
  return response.data
}

export default { getAll , createAnecdote, updateVote}
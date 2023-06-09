import { useState } from 'react'

const Button = ({label, anecdotes, selected}) => {

  console.log(selected)
  return (
    <button onClick = {label}> next anecdote </button>
  )
}
const Button_Vote = ({label, vote, selected}) => {
  return (
    <button onClick={label}> vote </button>
  )
} 
const Print = ({vote_selected}) => {
  if(vote_selected <= 1)
    return <p> has {vote_selected} vote </p>
  else
    return <p> has {vote_selected} votes </p>
}
const App = () => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const printRanNum = () => {
    var x = Math.floor((Math.random() * 8))
    setSelected(x)
    
  }
  /*
  Remember that the correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state.
  */
  const increaseVoteByOne = () => {
    let newArr = [...vote]
    newArr[selected] += 1
    setVote(newArr)
  }

  return (
    <div>
      
      {anecdotes[selected]}
      <p> </p>
      <Print vote_selected = {vote[selected]}/>
      <p> </p>
        <Button_Vote label = {increaseVoteByOne} vote = {vote} selected = {selected}/> 
        <Button label = {printRanNum} anecdotes = {anecdotes} selected = {selected}/>
    </div>
  )
}

export default App
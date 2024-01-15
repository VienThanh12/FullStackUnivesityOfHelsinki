// remember to download npm install react-router-dom
import { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams,
  useNavigate
} from 'react-router-dom' 

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2> Anecdotes </h2>
        <ul>
          {anecdotes.map(anecdote => 
            <li key = {anecdote.id} > 
              <Link to = {`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link> 
            </li>
          )}
        </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)
const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)
/*
instead of using 
<a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a>
we use
<Link to = {`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link> 
*/
const anecdoteById = (id) => anecdotes.find(a => a.id === id)

const AnecdotesRouted = (anecdotes) => {  
  const id = useParams().id
  const anecdote = anecdotes.anecdotes.find(a => a.id == id)
  
  return (
    <div>
      <h2> {anecdote.content} by {anecdote.author} </h2>
      <p> has {anecdote.votes} votes </p>
      <p> for more info see <Link to = {`${anecdote.info}`}> {anecdote.info} </Link> </p>
    </div>
  )
}
const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.onCreate(`a new anecdote ${content} created!`)
    navigate('/')  
    setTimeout(() => {
      props.onCreate(null)
    }, 5000)
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          content
          <input name='content' value = {content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value = {author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value = {info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button> create </button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }
  
  const [ok, setOk] = useState(null)
  
  const createNoti = (ok) => {
    setOk(ok)
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  

  const padding = {
    paddingRight: 10
  }
  return (
      <Router>
        <div>
          <h1> Software anecdotes </h1>
            <div>
              <Link to = "/" style = {padding}> anecdotes </Link>
              <Link to = "/create" style = {padding}> create new </Link>
              <Link to = "/about" style = {padding}> about </Link>
            </div>
          <div>
            <p> {ok} </p>
          </div>
          <Routes>
            <Route path = "/" element = {<AnecdoteList anecdotes = {anecdotes} />} />
            <Route path = "/create" element = {<CreateNew addNew = {addNew} onCreate = {createNoti}/>} />
            <Route path = "/about" element = {<About />} />
          
            <Route path = "/anecdotes/:id" element = {<AnecdotesRouted anecdotes = {anecdotes}/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
  )
}
// Link => to create the link when clicking the text
// Routes -> Route => to create the link

export default App

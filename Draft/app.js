const App = (props) => {
  const { notes } = props
  return (
    <div>
      <h1>Notes</h1>
      <ul> {notes.map(x => 
        <li key = {notes.id}>
          {x.content}
        </li>)} 
      </ul>
    </div>
  )
}

export default App

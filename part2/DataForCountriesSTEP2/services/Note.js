const Note = ({ note }) => {
    return (
    
      <p>
        {
            note.map(note => <p key = {note.id}> {note.name} {note.number} </p>)
        }
      </p>
    
    )
  }
  
export default Note
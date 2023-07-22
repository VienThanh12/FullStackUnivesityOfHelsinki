const NotiOfCreating = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="NotiOfCreating">
        {message}
      </div>
    )
  }
  
  export default NotiOfCreating
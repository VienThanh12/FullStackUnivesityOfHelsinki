const Notification = ({noti}) => {
  console.log(noti)
  if(noti != ''){
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5
    }
    
    return (
      <div style = {style}>
        {noti}
      </div>
    )
  }
}

export default Notification

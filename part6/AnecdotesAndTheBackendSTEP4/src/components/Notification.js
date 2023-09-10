import { useSelector } from 'react-redux'

const Notification = () => {

  var notification = useSelector(state => state.notification)
  setTimeout(() => {
    notification = null
  }, 5000)
  var style = {

  }
  
  if(notification[0] === '' && notification[1] === ''){
    
  }
  else {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }
  return (
    <div style = {style}>
      {notification} 
    </div>
  )
}

export default Notification
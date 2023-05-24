const Course = ({courses}) => {
    var x = 0
    for(var i = 0; i <= 3; i++){
      x += courses[0].parts[i].exercises    
    }
    var TotalAmoutStack = courses[0].parts.reduce((sum, courses) => sum + courses.exercises, 0)
    var TotalAmoutNode = courses[1].parts.reduce((sum, courses) => sum + courses.exercises, 0)
    return (
      <div> 
        <h1> {courses[2].name} </h1>
        <h2> {courses[0].name} </h2>
        <p> {courses[0].parts[0].name} {courses[0].parts[0].exercises} </p>
        <p> {courses[0].parts[1].name} {courses[0].parts[1].exercises} </p>
        <p> {courses[0].parts[2].name} {courses[0].parts[2].exercises} </p>
        <p> {courses[0].parts[3].name} {courses[0].parts[3].exercises} </p>
        <b> total of {TotalAmoutStack} exercises</b>
        <h2> {courses[1].name} </h2>
        <p> {courses[1].parts[0].name} {courses[1].parts[0].exercises} </p>
        <p> {courses[1].parts[1].name} {courses[1].parts[1].exercises} </p>
        <b> total of {TotalAmoutNode} exercises</b>
      </div>
    )
  }
export default Course
  

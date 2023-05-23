import Note from './Note'

const Course = ({course}) => {
  var x = 0
  for(var i = 0; i <= 3; i++){
    x += course.parts[i].exercises    
  }
  
  return (
    <div> 
      <h1> {course.name} </h1>
      <p> {course.parts[0].name} {course.parts[0].exercises} </p>
      <p> {course.parts[1].name} {course.parts[1].exercises} </p>
      <p> {course.parts[2].name} {course.parts[2].exercises} </p>
      <p> {course.parts[3].name} {course.parts[3].exercises} </p>
      <b> total of {x} exercises</b>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App

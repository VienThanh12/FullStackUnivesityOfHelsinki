import Note from './Note'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Web development curriculum'
    }
  ]

  return <Course courses = {courses} />
}

export default App

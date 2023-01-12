import React from 'react'

const Header = ({ course: { name } }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} - {part.exercises}</p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(p => (
        <Part part={p} />
      ))}
    </div>
  )
}

const Total = ({ course }) => {

  const totalCourses = () => {
    let total = 0
    course.parts.forEach(p => total += p.exercises)
    return total
  }

  return (
    <p>Total number of exercises: {totalCourses()}</p>
  )
}

export const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

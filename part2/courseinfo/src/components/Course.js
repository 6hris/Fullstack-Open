const Header = (props) =>{
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
  const Content = ({parts}) =>{
    return (
      <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
    )
  }
  
  const Total = ({parts}) =>{
    const total = parts.reduce((sum, order) => sum + order.exercises,0)
    return (
      <b>total of {total} excercises</b>
     /* <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p> */
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/> 
        <Total parts={course.parts}/>
      </div>
     
    )
  }


export default Course
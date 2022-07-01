import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td> {props.value}</td>
  </tr>
)

const Statistics = (props) => {
    
    if (props.good === 0){
      if (props.neutral === 0){
        if (props.bad === 0){
          return (
            <div>No feedback given</div>
          )
        }
      }
      
    }
      
    return (
      <div>
        <table>
          <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <tr>
          <td>all</td>
          <td>{props.good + props.neutral + props.bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(props.good - props.bad)/(props.good + props.neutral + props.bad)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(props.good/(props.good+ props.neutral + props.bad))*100}%</td>
        </tr>
        </tbody>
        </table>
        
        
        
        
      </div>
    )
  
  
    
}
    
  
  


  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
  <div>
     <h1>give feedback</h1>
    <Button handleClick={() => setGood(good +1)} text='good'/>
    <Button handleClick={() => setNeutral(neutral +1)} text='neutral'/>
    <Button handleClick={() => setBad(bad +1)} text='bad'/>
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  
    
  )
}

export default App
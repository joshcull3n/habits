
import Habit from './habit.js'
import HabitDates from './habitDates.js'

const HabitList = ({ habits, dateLabels }) => {
  
  function renderDateLabels() {
    return(
      <div>
        { dateLabels.map( (label, index) => {
            if (label == dateLabels[0]) { 
              return <span style={{paddingLeft:'6px', paddingRight:'1px', fontFamily:'monospace'}} key={index}>{label}</span> 
        
            }
            else { return <span style={{paddingLeft:'10.5px', fontFamily:'monospace'}} key={index}>{label}</span> }
        })}
      </div>
    )
  }


  return (
    <div className="habitList">
    <table>
    <thead>
      <tr><td></td><td>{ renderDateLabels() }</td></tr>
    </thead>
    <tbody>
      {habits.map(habit => <tr key={habit.id}><td><Habit habit={habit}/></td><td><HabitDates habit={habit} /></td></tr>)}
    </tbody></table>
    </div>
  );
}

export default HabitList;

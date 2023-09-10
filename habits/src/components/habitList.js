
import { useContext } from 'react'
import Habit from './habit.js'
import HabitDates from './habitDates.js'
import { Context } from '../Context.js'
import deletePng from '../images/delete.png'

const HabitList = ({ dateLabels }) => {
  const { habits, setHabits } = useContext(Context);
  
  function renderDateLabels() {
    return(
      <div>
        { dateLabels.map((label, index) => {
          if (label == dateLabels[0])
            return <span style={{paddingLeft:'6px', paddingRight:'1px', fontFamily:'monospace'}} key={index}>{label}</span> 
          else
            return <span style={{paddingLeft:'10.5px', fontFamily:'monospace'}} key={index}>{label}</span> 
        })}
      </div>
    )
  }

  function deleteHabit(id) {
    setHabits(habits.filter(habit => habit.id != id));
  }

  const DeleteButton = (habit) => {
    return <img src={deletePng} style={{verticalAlign: 'baseline', width: '9px'}} onClick={() => deleteHabit(habit.id)}/>
  }

  return (
    <div className="habitList">
      <table>
        <thead><tr><td></td><td>{ renderDateLabels() }</td></tr></thead>
        <tbody>
          {habits.map(habit => <tr key={habit.id}><td><Habit habit={habit}/></td><td><HabitDates habit={habit} /></td><td><DeleteButton id={habit.id}/></td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default HabitList;

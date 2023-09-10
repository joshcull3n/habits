
import { useContext } from 'react'
import Habit from './habit.js'
import HabitDates from './habitDates.js'
import { Context } from '../Context.js'
import deletePng from '../images/delete.png'
import dateLeft from '../images/arrows/doubleLeft.png'
import dateRight from '../images/arrows/doubleRight.png'

const HabitList = ({ dateLabels }) => {
  const { habits, setHabits, startDate, setStartDate, endDate, setEndDate } = useContext(Context);
  
  function renderDateLabels() {
    return(
      <div style={{paddingBottom:'2px'}}>
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

  // paginate dates 1 day into the past
  function datePageLeftDay() {
    var tempStart = new Date(startDate);
    var tempEnd = new Date(endDate);

    tempStart.setDate(tempStart.getDate() - 1);
    setStartDate(tempStart);
    tempEnd.setDate(tempEnd.getDate() - 1);
    setEndDate(tempEnd);
  }

  // paginate dates 1 day into the future
  function datePageRightDay() {
    var tempStart = new Date(startDate);
    var tempEnd = new Date(endDate);
    
    tempStart.setDate(tempStart.getDate() + 1);
    setStartDate(tempStart);
    tempEnd.setDate(tempEnd.getDate() + 1);
    setEndDate(tempEnd);
  }

  const DeleteButton = (habit) => {
    return <img src={deletePng} style={{verticalAlign: 'baseline', width: '9px'}} onClick={() => deleteHabit(habit.id)}/>
  }

  const DatePageButtonLeft = () => {
    return ( 
      <td style={{padding:'0'}}>
        <img className="datePaginator" 
          style={{width:'15px', float:'right'}} 
          src={dateLeft} 
          onClick={() => { datePageLeftDay() }}/>
      </td>
    )
  }

  const DatePageButtonRight = () => {
    return (
      <td style={{padding:'0'}}>
        <img className="datePaginator" 
          style={{width:'15px', float:'left'}} 
          src={dateRight} 
          onClick={() => { datePageRightDay() }}/>
      </td>
    )
  }

  return (
    <div className="habitList">
      <table>
        <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
        <tbody>
          {habits.map(habit => <tr key={habit.id}><td><Habit habit={habit}/></td><td><HabitDates habit={habit} /></td><td><DeleteButton id={habit.id}/></td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default HabitList;

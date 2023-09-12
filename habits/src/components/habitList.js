
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
    return (
      <td className='deleteButton' onClick={() => deleteHabit(habit.id)}>
        <img src={deletePng} className='deleteButton' style={{verticalAlign: 'baseline'}}/>
      </td>
    )
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

  const EmptyHabitList = () => {
    return (
      <div className="habitList">
      <table>
        <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
        <tbody>
          <tr><td style={{minWidth:'300px'}}>add some habits first... </td></tr>
        </tbody>
      </table>
    </div>
    )
  }

  const HabitList = () => {
    return (
      <div className="habitList">
        <table style={{tableLayout:'fixed', overflow:'hidden', minWidth:'410px', maxWidth:'410px'}}>
          <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
          <tbody>
            {habits.map(habit => <tr className='habitRow' key={habit.id}>
                <td style={{textAlign:'left', maxWidth:'215px', minWidth:'215px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}><Habit habit={habit}/></td>
                <td style={{minWidth:'168px'}}><HabitDates habit={habit} /></td>
                <DeleteButton className='deleteButton' id={habit.id}/>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }

  if (habits.length < 1)
    return <EmptyHabitList />;
  else
    return <HabitList />;

}

export default HabitList;

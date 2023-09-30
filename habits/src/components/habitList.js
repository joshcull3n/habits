
import { useContext } from 'react'
import Habit from './habit.js'
import HabitDates from './habitDates.js'
import { Context } from '../Context.js'
import deletePng from '../images/delete.png'
import dateLeft from '../images/arrows/doubleLeft.png'
import dateRight from '../images/arrows/doubleRight.png'

const HabitList = ({ dateLabels, mobile }) => {
  const { habits, setHabits, startDate, setStartDate, endDate, setEndDate } = useContext(Context);
  
  function renderDateLabels() {
    return(
      <div className="spaceEvenly" style={{padding:'2px 2px 0px'}}>
        { dateLabels.map((label, index) => {
          if (label === dateLabels[0])
            return <span className="monospaceText" key={index}>{label}</span> 
          else
            return <span className="monospaceText" key={index}>{label}</span> 
        })}
      </div>
    )
  }

  function deleteHabit(id) {
    setHabits(habits.filter(habit => habit.id !== id));
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
        <img alt='x' id="deleteButton" style={{verticalAlign: 'baseline'}}/>
      </td>
    )
  }

  const DatePageButtonLeft = () => {
    return ( 
      <td style={{padding:'0'}}>
        <img alt='date page left' id="calendarLeft" className="datePaginator" 
          style={{width:'15px', float:'right'}} 
          onClick={() => { datePageLeftDay() }}/>
      </td>
    )
  }

  const DatePageButtonRight = () => {
    return (
      <td style={{padding:'0'}}>
        <img alt='date page right' id="calendarRight" className="datePaginator" 
          style={{width:'15px', float:'left'}} 
          onClick={() => { datePageRightDay() }}/>
      </td>
    )
  }

  const EmptyHabitList = () => {
    return (
    <div className='centered'>
      <div style={{paddingTop: '10px', opacity:0.3, textAlign: 'center', fontFamily:'monospace'}}>add a habit below.<br/>(quit smoking, floss everyday, etc.)</div>
    </div>
    )
  }

  const HabitList = () => {
    if (mobile) {
      return (
        <div className="centered">
          <table>
            <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr key={index}>
                  <td style={{maxWidth:'200px', minWidth:'120px', paddingLeft:'2px'}}><Habit habit={habit}/></td>
                  <td style={{minWidth:'100px', paddingLeft:'1.3px'}}><HabitDates habit={habit} /></td>
                  <DeleteButton className='deleteButton' id={habit.id}/>
                </tr>)}
            </tbody>
          </table>
        </div>
      )
    }
    else {
      return (
        <div className="centered" style={{paddingLeft: '1.5rem', paddingRight:'1.5rem'}}>
          <table>
            <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr key={index}>
                  <td style={{maxWidth:'350px',minWidth:'75px', paddingLeft: '2px'}}><Habit habit={habit}/></td>
                  <td style={{minWidth:'168px'}}><HabitDates habit={habit} /></td>
                  <DeleteButton className='deleteButton' id={habit.id}/>
                </tr>)}
            </tbody>
          </table>
        </div>
      )
    }
  }

  if (habits.length < 1)
    return <EmptyHabitList />;
  else
    return <HabitList />;

}

export default HabitList;

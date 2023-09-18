
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
      <div style={{paddingBottom:'2px'}}>
        { dateLabels.map((label, index) => {
          if (label === dateLabels[0])
            return <span style={{paddingLeft:'6px', paddingRight:'1px', fontFamily:'monospace'}} key={index}>{label}</span> 
          else
            return <span style={{paddingLeft:'10.5px', fontFamily:'monospace'}} key={index}>{label}</span> 
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
        <img alt='delete button' src={deletePng} className='deleteButton' style={{verticalAlign: 'baseline'}}/>
      </td>
    )
  }

  const DatePageButtonLeft = () => {
    return ( 
      <td style={{padding:'0'}}>
        <img alt='date page left' className="datePaginator" 
          style={{width:'15px', float:'right'}} 
          src={dateLeft} 
          onClick={() => { datePageLeftDay() }}/>
      </td>
    )
  }

  const DatePageButtonRight = () => {
    return (
      <td style={{padding:'0'}}>
        <img alt='date page right' className="datePaginator" 
          style={{width:'15px', float:'left'}} 
          src={dateRight} 
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
          <table cellPadding={0} cellSpacing={0}>
            <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels(mobile) }</td><DatePageButtonRight /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr key={index} className="habitRow">
                  <td style={{maxWidth:'200px', minWidth:'120px'}}><Habit habit={habit}/></td>
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
          <table cellSpacing={0}>
            <thead><tr><DatePageButtonLeft /><td>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr key={index} className="habitRow">
                  <td style={{maxWidth:'350px',minWidth:'75px'}}><Habit habit={habit}/></td>
                  <td style={{minWidth:'168px', paddingLeft:'1.3px'}}><HabitDates habit={habit} /></td>
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

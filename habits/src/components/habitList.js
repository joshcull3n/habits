
import { useContext } from 'react'
import Habit from './habit.js'
import HabitDates from './habitDates.js'
import { Context } from '../Context.js'

const HabitList = ({ dateLabels, mobile }) => {
  const { habits, setHabits, startDate, setStartDate, endDate, setEndDate } = useContext(Context);

  // generate list of date strings between two given dates
  function genDates(startDate, endDate) {
    var dates = [];
    const currDate = new Date(startDate);

    while (currDate <= endDate) {
      dates.push(currDate.toDateString());
      currDate.setDate(currDate.getDate() + 1);
    }

    return dates;
  }

  function renderDateLabels() {
    return(
      <div className="spaceEvenly" style={{ padding:'2px 0px 0px', fontSize:'xx-small', marginLeft: '7px', marginRight: '8px' }}>
        { dateLabels.map((label, index) => {
            return (
              <span className="monospaceText dateLabel" id={label} key={index}>
                {label}
              </span> 
          );
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

  function setLabelOpacity(habit) {
    const habitLabelElements = document.querySelectorAll(".habitItem");
    habitLabelElements.forEach (habitElement => {
      let opacityValue = 1.0;
      let transitionValue = "opacity 0.2s ease-in-out"
      if (habit) {
        const habitBody = habit.body;
        if (habitElement.textContent !== habit.body) {
          opacityValue = 0.5;
          transitionValue = "";
        }
      }
      habitElement.style.opacity = opacityValue;
      habitElement.style.transition = transitionValue;
    })
  }

  const DeleteButton = (props) => {
    return (
      <td className='deleteButton' onMouseEnter={() => setLabelOpacity(props.habit)} onMouseLeave={() => setLabelOpacity(null)} onClick={() => deleteHabit(props.id)}>
        <img alt='x' id="deleteButton" style={{verticalAlign: 'baseline'}}/>
      </td>
    )
  }

  const DatePageButtonLeft = () => {
    return ( 
      <td style={{paddingBottom:'7px'}}>
        <img alt='date page left' id="calendarLeft" className="datePaginator" 
          style={{width:'15px', float:'right'}} 
          onClick={() => { datePageLeftDay() }}/>
      </td>
    )
  }

  const DatePageButtonRight = () => {
    return (
      <td style={{paddingBottom:'7px'}}>
        <img alt='date page right' id="calendarRight" className="datePaginator" 
          style={{width:'15px', float:'left'}} 
          onClick={() => { datePageRightDay() }}/>
      </td>
    )
  }

  const EmptyHabitList = () => {
    return (
    <div className='centered'>
      <div style={{paddingBottom: '10px', opacity:0.7, textAlign: 'center', fontFamily:'monospace'}}>
        add a habit below.<br/>(quit smoking, floss everyday, etc.)
      </div>
    </div>
    )
  }

  const FullHabitList = () => {
    if (mobile) {
      return (
        <div>
          <table>
            <thead><tr><DatePageButtonLeft/><td style={{padding: '2px 2px 0px 4px'}}>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr>
                  <td style={{maxWidth:'155px', minWidth:'120px', paddingLeft:'2px'}}><Habit habit={habit}/></td>
                  <td style={{minWidth:'100px', paddingLeft:'1.3px'}}>
                    <HabitDates habit={habit} dates={genDates(startDate, endDate)}/>
                  </td>
                  <DeleteButton className='deleteButton' id={habit.id} habit={habit}/>
                </tr>)}
            </tbody>
          </table>
        </div>
      )
    }
    else {
      return (
        <div>
          <table style={{borderCollapse: 'collapse', borderSpacing: 0}}>
            <thead><tr><DatePageButtonLeft /><td style={{paddingBottom: '7px'}}>{ renderDateLabels() }</td><DatePageButtonRight /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr>
                  <td style={{maxWidth:'350px',minWidth:'75px', paddingLeft: '2px'}}><Habit habit={habit}/></td>
                  <HabitDates habit={habit} dates={genDates(startDate, endDate)}/>
                  <DeleteButton className='deleteButton' id={habit.id} habit={habit}/>
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
    return <FullHabitList />;

}

export default HabitList;

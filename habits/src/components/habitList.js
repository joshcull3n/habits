
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
      dates.unshift(currDate.toDateString());
      currDate.setDate(currDate.getDate() + 1);
    }

    return dates;
  }

  function renderDateLabels() {
    var dateLabelsElem = dateLabels.map((label, index) => {
      if (index == 0) {
        return (
          <span className="monospaceText dateLabel" style={{ fontSize:'x-large', padding: '5px 2px 5px 0px'}} id={label} key={index}>
                {label}
          </span>
        )
      }
      else {
        return (
          <span className="monospaceText dateLabel" id={label} key={index}>
            {label}
          </span> );
      }
    });
    
    return(
      <div className="spaceEvenly" style={{ padding:'2px 0px 0px', fontSize:'x-small', marginLeft: '7px', marginRight: '7px' }}>
        { dateLabelsElem }
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

    tempStart.setDate(tempStart.getDate() + 1);
    setStartDate(tempStart);
    tempEnd.setDate(tempEnd.getDate() + 1);
    setEndDate(tempEnd);
  }

  // paginate dates 1 day into the future
  function datePageRightDay() {
    var tempStart = new Date(startDate);
    var tempEnd = new Date(endDate);
    
    tempStart.setDate(tempStart.getDate() - 1);
    setStartDate(tempStart);
    tempEnd.setDate(tempEnd.getDate() - 1);
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

  const DatePageButtonLeft = (props) => {
    if (props.mobile) {
      return ( 
        <td>
          <img alt='date page left' id="calendarLeft" className="datePaginator" 
            style={{width: '25px', float: 'right', marginRight: '-5px', paddingTop: '2px'}} 
            onClick={() => { datePageLeftDay() }}/>
        </td>
      )
    }
    else {
      return ( 
        <td>
          <img alt='date page left' id="calendarLeft" className="datePaginator" 
            style={{width:'15px', float:'right'}} 
            onClick={() => { datePageLeftDay() }}/>
        </td>
      )
    }
  }

  const DatePageButtonRight = (props) => {
    if (props.mobile) {
      return (
        <td>
          <img alt='date page right' id="calendarRight" className="datePaginator" 
            style={{width:'25px', float:'left', marginLeft: '-1px', paddingTop: '2px'}} 
            onClick={() => { datePageRightDay() }}/>
        </td>
      )
    }
    else {
      return (
        <td>
          <img alt='date page right' id="calendarRight" className="datePaginator" 
            style={{width:'15px', float:'left', paddingLeft: '1px'}} 
            onClick={() => { datePageRightDay() }}/>
        </td>
      )
    }
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
            <thead><tr><DatePageButtonLeft mobile={true} /><td style={{padding: '0px 2px 0px 3px'}}>{ renderDateLabels() }</td><DatePageButtonRight mobile={true} /></tr></thead>
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
            <thead><tr><DatePageButtonLeft mobile={false} /><td>{ renderDateLabels() }</td><DatePageButtonRight mobile={false} /></tr></thead>
            <tbody>
              {habits.map((habit, index) => <tr>
                  <td style={{maxWidth:'250px',minWidth:'75px', paddingLeft: '2px'}}><Habit habit={habit}/></td>
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

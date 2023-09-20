import { useContext } from 'react'
import Habit from './habit.js'
import HabitDates from './habitDates.js'
import { Context } from '../Context.js'
import deletePng from '../images/delete.png'
import dateLeft from '../images/arrows/doubleLeft.png'
import dateRight from '../images/arrows/doubleRight.png'

const HabitTable = ({dateLabels}) => {
  const { habits, setHabits, startDate, setStartDate, endDate, setEndDate } = useContext(Context);

  function renderDateLabels(dates) {
    return(
      <div className='dateLabelsContainer'>
        { dates.map((label, index) => <span className="dateLabel" key={index}>{label}</span> )}
      </div>
    )
  }

  const DatePageLeft = () => {
    function datePageLeftDay() {
      var tempStart = new Date(startDate);
      var tempEnd = new Date(endDate);
  
      tempStart.setDate(tempStart.getDate() - 1);
      setStartDate(tempStart);
      tempEnd.setDate(tempEnd.getDate() - 1);
      setEndDate(tempEnd);
    }

    return ( 
      <div className='datePageLeft'>
        <img alt='date page left' className="datePaginator" src={dateLeft} 
          onClick={() => { datePageLeftDay() }}/>
      </div>
    )
  }

  const DatePageRight = () => {
    // paginate dates 1 day into the future
    function datePageRightDay() {
      var tempStart = new Date(startDate);
      var tempEnd = new Date(endDate);
      
      tempStart.setDate(tempStart.getDate() + 1);
      setStartDate(tempStart);
      tempEnd.setDate(tempEnd.getDate() + 1);
      setEndDate(tempEnd);
    }

    return (
      <div className='datePageRight'>
        <img alt='date page right' className="datePaginator" src={dateRight} 
          onClick={() => { datePageRightDay() }}/>
      </div>
    )
  }

  const OutputList = () => {

    return (
      <div className='listContainer'>
        <div className='listHeaderRow'>
          <div className='leftColumn'></div>
          <div className='rightColumn'>
            <div className='listHeaderRow' style={{justifyContent: 'space-between'}}>
              <DatePageLeft />{renderDateLabels(dateLabels)}<DatePageRight />
            </div>
          </div>
        </div>
        <div className='listBody'>
          <div className='leftColumn'>habit text</div>
          <div className='rightColumn'>habit checkboxes
            <div className='habitText'></div><div className='habitChecks'></div><div className='deleteButton'></div>
            <div className='habitText'></div><div className='habitChecks'></div><div className='deleteButton'></div>
          </div>
        </div>
      </div>
    )
  }

  const MobileList = () => {

  }

  const EmptyList = () => {
    return (
      <div className='centered emptyList'>
        <div style={{paddingTop: '10px', opacity:0.3, textAlign: 'center', fontFamily:'monospace'}}>
          add a habit below.<br/>(quit smoking, floss everyday, etc.)
        </div>
      </div>
    )
  }

  if (habits.length < 1)
    return <EmptyList />;
  else
    return <OutputList />;
}

export default HabitTable;
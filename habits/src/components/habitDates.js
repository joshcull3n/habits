import { useContext } from "react";
import { Context } from "../Context";

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

// checkbox component - determines whether or not to display checked based on given date and completed dates
const Checkbox = (props) => {
  const { habits, setHabits } = useContext(Context);
  var checked = false;

  props.doneDates.forEach(date => {
    if (date.toDateString() == props.date)
      checked = true;
  });

  function handleCheck(e) {
    var tempDates = Array.from(props.doneDates);
    var habitIndex = habits.indexOf(props.habit);
    
    if (!e.target.checked) {
      // remove date from habit.doneDates
      tempDates.forEach(date => {
        if (date.toDateString() == props.date) {
          var index = props.habit.doneDates.indexOf(date);
          if (index > -1)
            props.habit.doneDates.splice(index, 1);
        }
        var tempHabitsArr = Array.from(habits);
        if (habitIndex > -1)
          tempHabitsArr[habitIndex] = props.habit;
        setHabits(tempHabitsArr);
      })
    }
    else {
      // add date to habit.doneDates
      tempDates.push(new Date(props.date));
      var tempHabitsArr = Array.from(habits);
      tempHabitsArr[habitIndex].doneDates = tempDates;
      setHabits(tempHabitsArr);
    }
  }

  if (checked)
    return <span className="checkedInput"><input type="checkbox" checked={checked} onChange={handleCheck} id="checkedInput" style={{height:'17px', width:'17px'}}/><label htmlFor="checkedInput"></label></span>
  else
    return <span className="uncheckedInput"><input type="checkbox" checked={!!checked} onChange={handleCheck} id="uncheckedInput" style={{height:'17px', width:'17px'}}/><label htmlFor="uncheckedInput"></label></span>
}

// checkbox list - renders checkbox components for given dates
const CheckboxList = (props) => {
  var dates = genDates(props.startDate, props.endDate);
  return (
    <div>
      { dates.map((date, index) => <span style={{padding:'0px'}} key={index}><Checkbox habit={props.habit} date={date} doneDates={props.doneDates} /></span>) }
    </div>
  )
}

const HabitDates = ({ habit }) => {
  const { startDate, endDate } = useContext(Context);

  return (
    <div className="habitDates">
      <CheckboxList habit={habit} startDate={startDate} endDate={endDate} doneDates={habit.doneDates} />
    </div>
  )
}

export default HabitDates;

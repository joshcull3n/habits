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

// TODO
function handleCheckboxChange(event) {

}

// checkbox component - determines whether or not to display checked based on given date and completed dates
const Checkbox = (props) => {
  var checked = false;

  props.doneDates.forEach(date => {
    if (date.toDateString() == props.date)
      checked = true;
  });

  if (checked)
    return <input type="checkbox" checked onChange={handleCheckboxChange}/>
  else
    return <input type="checkbox" onChange={handleCheckboxChange}/>
}

// checkbox list - renders checkbox components for given dates
const CheckboxList = (props) => {
  var dates = genDates(props.startDate, props.endDate);
  return (
    <div>
      { dates.map((date, index) => <span style={{padding:'2px'}} key={index}><Checkbox date={date} doneDates={props.doneDates} /></span>) }
    </div>
  )
}

const HabitDates = ({ habit }) => {
  const { startDate, endDate } = useContext(Context);
  var doneDates = habit.doneDates;

  return (
    <div className="habitDates">
      <CheckboxList startDate={startDate} endDate={endDate} doneDates={doneDates} />
    </div>
  )
}

export default HabitDates;

import { useContext } from "react";
import { Context } from "../Context";

const HabitDates = ({ habit, dates }) => {
  const { habits, setHabits } = useContext(Context);

  function setDateLabelOpacity(date) {
    const dateLabelElements = document.querySelectorAll(".dateLabel");
    dateLabelElements.forEach( labelElement => {
      let opacityValue = 1;
      if (date) {
        const day = new Date(date).getDate();
        const labelDistance = Math.abs(Number(labelElement.id) - day);
        if (labelDistance !== 0)
          opacityValue = 0.4;
      }
      labelElement.style.opacity = opacityValue;
    });
  }

  // checkbox component - determines whether or not to display checked based on given date and completed dates
  const Checkbox = (props) => {
    var checked = false;

    props.doneDates.forEach(date => {
      if (date.toDateString() === props.date)
        checked = true;
    });

    function handleCheck(e) {
      var tempDates = Array.from(props.doneDates);
      var habitIndex = habits.indexOf(props.habit);
      
      if (!e.target.checked) {
        // remove date from habit.doneDates
        tempDates.forEach(date => {
          if (date.toDateString() === props.date) {
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

    if (checked) {
      return (
        <td onMouseEnter={() => setDateLabelOpacity(props.date)}>
          <input type="checkbox" checked={checked} onChange={handleCheck} style={{height:'17px', width:'17px'}}/>
        </td>
      )
    }
    else {
      return (
        <td onMouseEnter={() => setDateLabelOpacity(props.date)}>
          <input type="checkbox" checked={!!checked} onChange={handleCheck} style={{height:'17px', width:'17px'}}/>
        </td>
      )
    }
  }

  return (
    <span style={{minWidth:'168px'}} onMouseLeave={() => setDateLabelOpacity(null)}>
      { dates.map((date, index) => <Checkbox key={index} habit={habit} date={date} doneDates={habit.doneDates} />) }
    </span>
  )
}

export default HabitDates;

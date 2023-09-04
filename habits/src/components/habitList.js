
import Habit from './habit.js'
import HabitDates from './habitDates.js'

const HabitList = ({ habits }) => {
  return (
    <div className="habitList">
    <table>
      {habits.map(habit => <tr><td><Habit key={habit.id} habit={habit}/></td><td><HabitDates habit={habit} /></td></tr>)}
    </table>
    </div>
  );
}

export default HabitList;

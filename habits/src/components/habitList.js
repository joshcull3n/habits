
import Habit from './habit.js'
import HabitDates from './habitDates.js'

const HabitList = ({ habits }) => {
  return (
    <div className="habitList">
    <table><tbody>
      {habits.map(habit => <tr key={habit.id}><td><Habit habit={habit}/></td><td><HabitDates habit={habit} /></td></tr>)}
    </tbody></table>
    </div>
  );
}

export default HabitList;

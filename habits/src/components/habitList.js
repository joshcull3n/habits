import Habit from './habit.js'

const HabitList = ({ habits }) => {
  return (
    <div className="habitList">
      {habits.map(habit => <Habit key={habit.id} habit={habit} />)}
    </div>
  );
}

export default HabitList;

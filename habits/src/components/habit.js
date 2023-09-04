/*
 * {
 *   habit.id : 4,
 *   habit.body : '...', 
 *   habit.doneDates : [Date,Date,Date]
 * }
 */

const Habit = ({ habit }) => {
  return (
    <div className="habit">{habit.body}</div>
  )}

export default Habit;

/*
 * {
 *   habit.id : 4,
 *   habit.body : '...', 
 *   habit.doneDates : [Date,Date,Date]
 * }
 */

const Habit = ({ habit }) => {
  return (
    <div className="habitItem">{habit.title}</div>
  )}

export default Habit;

/*
 * {
 *   habit.id : 4,
 *   habit.body : '...', 
 *   habit.doneDates : [Date,Date,Date]
 * }
 */

const Habit = ({ habit }) => {
  return (
    <div className="habit" style={{textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{habit.body}</div>
  )}

export default Habit;

import HabitList from './habitList.js';
import { Context } from '../Context.js';
import { useContext } from 'react';

const TopBar = () => {
  return (
    <div className="centered" style={{ paddingTop:'0.5rem'}}>
      <h2>habits</h2>
    </div>
  );
};

const HabitInput = ({handleHabitInputChange, handleHabitInputEnter}) => {
  const { newHabitText } = useContext(Context);
  return (
    <div className="centered" style={{ paddingTop:'1rem'}}>
      <p>
        <input style={{textAlign:'center'}} 
          placeholder='add a new habit' 
          value={newHabitText} 
          onKeyDown={handleHabitInputEnter} 
          onChange={handleHabitInputChange}/>
      </p>
    </div>
  );
};

const MainPanel = ({ mobile, handleHabitInputChange, handleHabitInputEnter }) => {
  const { habits, startDate, endDate } = useContext(Context);

  function generateDateLabels() {
    var tempDate = new Date(startDate);
    var labels = [];

    while (tempDate <= endDate) {
      var tempLabel = tempDate.getDate();
      if (tempLabel < 10)
        tempLabel = '0' + tempLabel.toString();
      labels.push(tempLabel.toString());
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return labels
  }

  return (
    <div>
      <TopBar />
      <HabitList mobile={mobile} habits={habits} dateLabels={generateDateLabels()}/>
      <HabitInput 
        handleHabitInputEnter={handleHabitInputEnter} 
        handleHabitInputChange={handleHabitInputChange} />
    </div>
  );
};

export default MainPanel;

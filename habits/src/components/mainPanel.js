import HabitList from './habitList.js';
import Graph from './graph.js';
import { Context } from '../Context.js';
import { useContext } from 'react';

const TopBar = () => {
  return (
    <div className="centered">
      <h2>habits</h2>
    </div>
  );
};

const HabitInput = ({mobile, handleHabitInputChange, handleHabitInputEnter, handleHabitInputBtnClick}) => {
  const { newHabitText } = useContext(Context);
    
  return (
    <div className="centered" style={{ paddingTop:'1rem'}}>
      <div style={{display: 'inline-flex'}}>
        <input style={{textAlign:'center'}} 
          placeholder='add a new habit' 
          value={newHabitText} 
          onKeyDown={handleHabitInputEnter} 
          onChange={handleHabitInputChange}/>
        <div id='inputBtn' onClick={handleHabitInputBtnClick}>＋</div>
      </div>
    </div>
  )
};

const MainPanel = ({ mobile, handleHabitInputChange, handleHabitInputEnter, handleHabitInputBtnClick }) => {
  const { habits, startDate, endDate } = useContext(Context);

  function generateDateLabels() {
    var tempDate = new Date(startDate);
    var labels = [];

    while (tempDate <= endDate) {
      var tempLabel = tempDate.getDate();
      if (tempLabel < 10)
        tempLabel = '0' + tempLabel.toString();
      labels.unshift(tempLabel.toString());
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return labels
  }

  return (
    <div className="mainPanel" style={{padding:'10px'}}>
        <TopBar />
        <div id="habitListContainer">
          <HabitList mobile={mobile} habits={habits} dateLabels={generateDateLabels()} />
          <HabitInput mobile={mobile}
            handleHabitInputEnter={handleHabitInputEnter} 
            handleHabitInputChange={handleHabitInputChange} 
            handleHabitInputBtnClick={handleHabitInputBtnClick} />
        </div>
        <Graph />
    </div>
  );
};

export default MainPanel;

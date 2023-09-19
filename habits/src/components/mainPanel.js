import HabitList from './habitList.js';
import { Context } from '../Context.js';
import { useContext } from 'react';

const TopBar = () => {
  return (
    <div className="top-block is-layout-flex centered">
      <h2>habits</h2>
    </div>
  );
};

const HabitInput = ({handleHabitInputChange, handleHabitInputEnter}) => {
  const { newHabitText } = useContext(Context);
  return (
    <div className="is-layout-flex centered" style={{ display: 'flex', paddingTop:'1rem', marginLeft: '40px', marginRight: '55px'}}>
      <p><input style={{textAlign:'center', placeholderColor:'#EB575726' }} placeholder='add a new habit' value={newHabitText} onKeyDown={handleHabitInputEnter} onChange={handleHabitInputChange}/></p>
    </div>
  );
};

const MainPanel = ({ handleHabitInputChange, handleHabitInputEnter }) => {
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
    <div className="top-block mainPanel" style={{paddingRight:'0px'}}>
      <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', paddingTop:'0.5rem', marginLeft: '40px', marginRight: '55px'}}>
        <TopBar />
      </div>
      <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', paddingTop:'0rem', marginLeft: '40px', marginRight: '55px'}}>
        <HabitList habits={habits} dateLabels={generateDateLabels()}/>
      </div>
      <HabitInput 
        handleHabitInputEnter={handleHabitInputEnter} 
        handleHabitInputChange={handleHabitInputChange} />
    </div>
  );
};

export default MainPanel;

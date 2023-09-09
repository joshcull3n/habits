import HabitList from './habitList.js';

const TopBar = () => {
  return (
    <div className="top-block is-layout-flex centered">
      <h2>habits</h2>
    </div>
  );
};

const HabitInput = ({handleHabitInputChange, newHabitBody, handleHabitInputEnter}) => {
  return (
    <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', marginLeft: '40px', marginRight: '55px'}}>
      <p>add a new habit... <input value={newHabitBody} onKeyDown={handleHabitInputEnter} onChange={handleHabitInputChange}/></p>
    </div>
  );
};

const MainPanel = ({habits, handleHabitInputChange, handleHabitInputEnter, newHabitBody, startDate, endDate}) => {
  function generateDateLabels() {
    var tempDate = new Date(startDate);
    var labels = [];

    while (tempDate <= endDate) {
      var tempLabel = tempDate.getDate();
      if (tempLabel < 10) {
        tempLabel = '0' + tempLabel.toString();
      labels.push(tempLabel.toString());
      tempDate.setDate(tempDate.getDate() + 1);
      }
    }

    return labels
  }

  return (
    <div className="top-block" style={{paddingRight:'0px'}}>
      <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', marginLeft: '40px', marginRight: '55px'}}>
        <TopBar />
      </div>
      <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', marginLeft: '40px', marginRight: '55px'}}>
        <HabitList habits={habits} dateLabels={generateDateLabels()}/>
      </div>
      <HabitInput 
        handleHabitInputEnter={handleHabitInputEnter} 
        handleHabitInputChange={handleHabitInputChange} 
        newHabitBody={newHabitBody}/>
    </div>
  );
};

export default MainPanel;

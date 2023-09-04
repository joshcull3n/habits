import { useState } from 'react';
import './App.css';
import HabitList from './components/habitList.js'
import * as habitUtils from './utils/habitUtils.js'

const App = () => {

  const testHabits = [
    { id: 0, body: 'floss', doneDates: [new Date('1 September 2023'), new Date('3 September 2023')] },
    { id: 1, body: 'do 50 pushups', doneDates: [new Date('28 August 2023'), new Date('30 August 2023'), new Date('1 September 2023')] },
    { id: 2, body: 'learn how to do the worm', doneDates: [] }
  ]

  const [habits, setHabits] = useState(testHabits);
  const [newHabitBody, setNewHabitBody] = useState('');
  
  function addHabit() {
    const habit = habitUtils.generateHabit(habits.length + 1, newHabitBody, []);
    setHabits(habits.concat(habit));
    setNewHabitBody('');
  }

  const TopBar = () => {
    return (
      <div className="top-block is-layout-flex centered">
        <h2>habits</h2>
      </div>
    )
  }
      

  const MainPanel = () => {
    return (
      <div className="top-block" style={{paddingRight:'0px'}}>
        <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', marginLeft: '40px', marginRight: '55px'}}>
          <TopBar />
        </div>
        <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', marginLeft: '40px', marginRight: '55px'}}>
          <HabitList habits={habits}/>
        </div>
        <div className="is-layout-flex centered" style={{ display: 'flex', padding: '2.25rem', paddingBottom: '0rem', marginLeft: '40px', marginRight: '55px'}}>
          <p>add a new habit... <input /></p>
        </div>
      </div>
    )
  }


  return (
    <div className="App">
      <MainPanel />
    </div>
  );
}

export default App;

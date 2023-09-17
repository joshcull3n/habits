import React, { useContext } from 'react';
import './App.css';
import MainPanel from './components/mainPanel.js';
import { generateHabit } from './utils/habitUtils.js';
import { Context } from './Context';

export function detectDevice() {
  var agent = window.navigator.userAgent.toLowerCase()
  //var isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
  var mobile = false;

  if (agent.includes('iphone') || agent.includes('android') || agent.includes('blackberry') || agent.includes('webOS'))
    mobile = true;

  return mobile
}

const App = () => {
  const { habits, setHabits, newHabitText, setNewHabitText } = useContext(Context);

  const handleHabitInputChange = (e) => {
    setNewHabitText(e.target.value);
  }

  const handleHabitInputEnter = (event) => {
    if (event.key === 'Enter') {
      setNewHabitText(event.target.value);
      addHabit();
    }
  }

  function addHabit() {
    const habit = generateHabit(habits.length + 1, newHabitText, []);
    setHabits(habits.concat(habit));
    setNewHabitText('');
  }

  return (
    <div className="App">
      <MainPanel 
        mobile={detectDevice()}
        handleHabitInputEnter={handleHabitInputEnter}
        handleHabitInputChange={handleHabitInputChange}/>
    </div>
  );
}

export default App;
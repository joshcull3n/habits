import React, { useContext } from 'react';
import './App.css';
import MainPanel from './components/mainPanel.js';
import { generateHabit } from './utils/habitUtils.js';
import { Context } from './Context';
import icon from './images/icon.gif'

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

  const HomePageButton = () => {
    return (
      <div className="homeIcon"  id="homeIcon">
        <a href="/" ><img decoding="async" src={icon} alt="home" width="45px"/></a>
      </div>
    )
  }

  return (
    <div className="App">
      <HomePageButton />
      <MainPanel 
        handleHabitInputEnter={handleHabitInputEnter}
        handleHabitInputChange={handleHabitInputChange}/>
    </div>
  );
}

export default App;

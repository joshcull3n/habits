import React, { useContext } from 'react';
import './App.css';
import MainPanel from './components/mainPanel.js';
import { generateHabit } from './utils/habitUtils.js';
import { Context } from './Context';
import icon from './images/icon.gif'

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

  document.body.classList.add('darkMode');

  const handleHabitInputChange = (e) => {
    setNewHabitText(e.target.value);
  }

  const handleHabitInputEnter = (event) => {
    if (event.key === 'Enter') {
      setNewHabitText(event.target.value);
      addHabit();
    }
  }

  const handleLightMode = (e) => {
    console.log('handleLightMode');
    if (e.target.checked) {
      document.body.classList.remove('darkMode');
      document.body.classList.add('lightMode');
    }
    else {
      document.body.classList.remove('lightMode');
      document.body.classList.add('darkMode');
    }
  }

  function addHabit() {
    const habit = generateHabit(habits.length + 1, newHabitText, []);
    setHabits(habits.concat(habit));
    setNewHabitText('');
  }

  const Sidebar = () => {
    return (
      <div className='stickyContainer'>
        <div className="homeIcon"><a href="/" ><img id="homeImg" decoding="async" src={icon} alt="home" width="45px"/></a>
          <div className="sidebarOption">
            <input type="checkbox" onChange={handleLightMode} id="lightModeSwitch"/>
            <label htmlFor="lightModeSwitch"></label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Sidebar />
      <div className='mainPanelContainer'>
        <MainPanel 
          mobile={detectDevice()}
          handleHabitInputEnter={handleHabitInputEnter}
          handleHabitInputChange={handleHabitInputChange}/>
      </div>
    </div>
  );
}

export default App;
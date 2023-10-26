import React, { useContext } from 'react';
import './App.css';
import './styles/dark.css';
import './styles/light.css';
import MainPanel from './components/mainPanel.js';
import { generateHabit } from './utils/habitUtils.js';
import { Context } from './Context';

export function detectDevice() {
  const agent = window.navigator.userAgent.toLowerCase()
  //var isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
  let mobile = false;

  if (agent.includes('iphone') || agent.includes('android') || agent.includes('blackberry') || agent.includes('webOS')) {
    document.body.classList.add('mobile');
    mobile = true;
  }
  
  return mobile
}

const App = () => {
  
  /* - DEBUG OPTIONS - */
  console.error = () => {}; // disable if you want to see console errors
  /* -- -- -- -- -- -- */

  const localStorage = window.localStorage;

  const { 
    habits, setHabits, newHabitText, setNewHabitText, 
    lightMode, setLightMode, setGraphGridColor 
  } = useContext(Context);

  // set body class
  document.body.classList.remove('lightMode');
  document.body.classList.remove('darkMode');
  if (lightMode)
    document.body.classList.add("lightMode");
  else
    document.body.classList.add('darkMode');

  const handleHabitInputChange = (e) => {
    setNewHabitText(e.target.value);
  }

  const handleHabitInputEnter = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      setNewHabitText(event.target.value);
      addHabit();
    }
  }

  const handleHabitInputBtnClick = () => {
    if (newHabitText)
      addHabit();
  }

  const handleLightMode = (e) => {
    setGraphGridColor(null);
    if (lightMode) {
      localStorage.setItem('lightMode_cullen', '');
      setLightMode(false);
    }
    else {
      localStorage.setItem('lightMode_cullen', 'true');
      setLightMode(true);
    }
  }

  function addHabit() {
    if (newHabitText.trim()) {
      const habit = generateHabit(habits.length + 1, newHabitText.trim(), []);
      setHabits(habits.concat(habit));
    }
    setNewHabitText('');
  }

  const Sidebar = () => {
    return (
      <div className='stickyContainer'>
        <div className="sidebar">
          <div id="sidebarShadow">
            <a href="/" style={{display:'flex', justifyContent:'center'}}><img id="homeImg" decoding="async" alt="home"/></a>
            <div className="sidebarOption">
              <input type="checkbox" onChange={handleLightMode} id="lightModeSwitch"/>
              <label htmlFor="lightModeSwitch"></label>
            </div>
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
          handleHabitInputChange={handleHabitInputChange}
          handleHabitInputBtnClick={handleHabitInputBtnClick}/>
      </div>
    </div>
  );
}

export default App;


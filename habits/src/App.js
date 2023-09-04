import { useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel.js';
import { generateHabit } from './utils/habitUtils.js';

const App = () => {

  const testHabits = [
    { id: 0, body: 'floss', doneDates: [new Date('1 September 2023'), new Date('3 September 2023')] },
    { id: 1, body: 'do 50 pushups', doneDates: [new Date('28 August 2023'), new Date('30 August 2023'), new Date('1 September 2023')] },
    { id: 2, body: 'learn how to do the worm', doneDates: [] }
  ];

  const [habits, setHabits] = useState(testHabits);
  const [newHabitBody, setNewHabitBody] = useState('');

  const handleHabitInputChange = (e) => {
    setNewHabitBody(e.target.value);
  }

  const handleHabitInputEnter = (event) => {
    if (event.key === 'Enter') {
      setNewHabitBody(event.target.value);
      addHabit();
    }
  }

  function addHabit() {
    const habit = generateHabit(habits.length + 1, newHabitBody, []);
    setHabits(habits.concat(habit));
    setNewHabitBody('');
  };

  return (
    <div className="App">
      <MainPanel habits={habits} 
        setNewHabitBody={setNewHabitBody}
        handleHabitInputEnter={handleHabitInputEnter}
        handleHabitInputChange={handleHabitInputChange}
        newHabitBody={newHabitBody}/>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import HabitList from './components/habitList.js'

const App = () => {


  const [habits, setHabits] = useState([{id: 0, body: 'floss', complete: false},{id:1,body:'do 50 push ups', complete: false}]);
  const [newHabitBody, setNewHabitBody] = useState('');

  const addHabit = () => {
    const habitObject = {
      id: habits.length + 1,
      body: newHabitBody,
      complete: false
    };
    setHabits(habits.concat(habitObject));
    setNewHabitBody('');
  }

  return (
    <div className="App">
      <h2>habits</h2>
      <HabitList habits={habits}/>
    </div>
  );
}

export default App;

import React, {useState} from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  var initHabits = [
    { id: 0, body: 'floss', doneDates: [new Date('2023/9/1'), new Date('2023/9/3')] },
    { id: 1, body: 'do 50 pushups', doneDates: [new Date('2023/8/28'), new Date('2023/9/1'), new Date('2023/9/6')] },
    { id: 2, body: 'learn how to do the worm', doneDates: [new Date('2023/9/8')] },
    { id: 3, body: 'swim', doneDates: [new Date('2023/9/4'), new Date('2023/9/6')] }
  ];

  var localStorage = window.localStorage;
  var testHabitJsonString = '[{"id": 0,"body": "floss","doneDates": ["2023 / 9 / 1 ", "2023 / 9 / 3 "]},{"id": 1,"body": "do 50 pushups","doneDates": ["2023 / 8 / 28 ", "2023 / 9 / 1 ", "2023 / 9 / 6 "]}]';

  localStorage.setItem("habits_jc", testHabitJsonString);
  var habitStorage = localStorage.getItem('habits_jc');

  // if there are habits in localStorage, parse them
  if (habitStorage) {
    var habitStorageJson = JSON.parse(habitStorage);
    initHabits = [];
    habitStorageJson.forEach(habit => {
      var tempDates = [];
      habit['doneDates'].forEach( date => {
        tempDates.push(new Date(date));
      })
      habit['doneDates'] = tempDates;
      initHabits.push(habit)
    })
  }

  // habits
  const [habits, setHabits] = useState(initHabits);
  const [newHabitText, setNewHabitText] = useState('');

  // dates
  const [endDate, setEndDate] = useState(new Date());
  var tempEnd = new Date(endDate);
  var start = new Date();
  start.setDate(tempEnd.getDate() - 6);
  const [startDate, setStartDate] = useState(start);


  return (
    <Context.Provider value={{ 
      habits, setHabits, 
      newHabitText, setNewHabitText, 
      endDate, setEndDate,
      startDate, setStartDate }}>
      { children }
    </Context.Provider>
  );
};

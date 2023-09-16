import React, {useEffect, useState} from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {

  var today = new Date();
  var yesterday2 = new Date();
  yesterday2.setDate(yesterday2.getDate()-2)
  var initHabits = [
    { id: 0, body: 'floss', doneDates: [today] },
    { id: 1, body: 'do 50 pushups', doneDates: [] },
    { id: 2, body: 'practice doing the worm', doneDates: [today, yesterday2] }
  ];

  function convertToYYYYMMDD(date) {
    var tempYear = date.getFullYear();
    var tempMonth = date.getMonth()+1;
    var tempDay = date.getDate();

    return tempYear + '/' + tempMonth + '/' + tempDay;
  }

  var localStorage = window.localStorage;
  var habitStorage = localStorage.getItem('habits_cullen');

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

  // set habits to localStorage on every render
  useEffect(() => {
    console.log('useEffect()');
    var tempHabitList = [];
    habits.forEach(habit => {
      var tempHabit = Object.create(habit);
      var tempDoneDates = [];
      habit['doneDates'].forEach(date => {
        tempDoneDates.push(convertToYYYYMMDD(date));
      })
      tempHabit = {...habit, 'doneDates': tempDoneDates};
      tempHabitList.push(tempHabit);
    });
    localStorage.setItem('habits_cullen', JSON.stringify(tempHabitList))
  }, [habits, localStorage])

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

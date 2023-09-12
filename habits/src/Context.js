import React, {useEffect, useState} from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  var initHabits = [
    { id: 0, body: 'floss', doneDates: [new Date('2023/9/1'), new Date('2023/9/3')] },
    { id: 1, body: 'do 50 pushups', doneDates: [new Date('2023/8/28'), new Date('2023/9/1'), new Date('2023/9/6')] },
    { id: 2, body: 'learn how to do the worm', doneDates: [new Date('2023/9/8')] },
    { id: 3, body: 'swim', doneDates: [new Date('2023/9/4'), new Date('2023/9/6')] }
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
  }, [habits])

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

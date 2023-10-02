import React, {useEffect, useState} from 'react';
import { detectDevice } from './App';

const mobile = detectDevice();

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {

  var yesterday2 = new Date();
  yesterday2.setDate(yesterday2.getDate()-2)
  var initHabits = []

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
  if (mobile)
    start.setDate(tempEnd.getDate() - 3);
  else
    start.setDate(tempEnd.getDate() - 6);
  const [startDate, setStartDate] = useState(start);

  const [lightMode, setLightMode] = useState(false);

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
      startDate, setStartDate,
      lightMode, setLightMode }}>
      { children }
    </Context.Provider>
  );
};

import React, {useEffect, useState} from 'react';
import { detectDevice } from './App';

const mobile = detectDevice();

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {

  var yesterday2 = new Date();
  yesterday2.setDate(yesterday2.getDate()-2)
  var initHabits = []

  function convertToYYYYMMDD(date) {
    const tempYear = date.getFullYear();
    const tempMonth = date.getMonth()+1;
    const tempDay = date.getDate();

    return tempYear + '/' + tempMonth + '/' + tempDay;
  }

  const localStorage = window.localStorage;
  const habitStorage = localStorage.getItem('habits_cullen');
  const lightModeStorage = localStorage.getItem('lightMode_cullen')

  // appearance
  const [lightMode, setLightMode] = useState(Boolean(lightModeStorage));
  const [graphFontColor, setGraphFontColor] = useState('rgb(0,0,0)');
  const [graphLineColor, setGraphLineColor] = useState('rgb(0,0,0)');
  const [graphBgColor, setGraphBgColor] = useState('rgb(0,0,0)');
  const [graphStepSize, setGraphStepSize] = useState('0.2');
  const [graphGridColor, setGraphGridColor] = useState('rgb(0,0,0)');

  // events
  const [hoveredDate, setHoveredDate] = useState(null);

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
    start.setDate(tempEnd.getDate() - 21);
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
  }, [habits, localStorage])

  return (
    <Context.Provider value={{ 
      habits, setHabits, 
      newHabitText, setNewHabitText, 
      endDate, setEndDate,
      startDate, setStartDate,
      lightMode, setLightMode,
      graphFontColor, setGraphFontColor,
      graphLineColor, setGraphLineColor,
      graphBgColor, setGraphBgColor,
      graphStepSize, setGraphStepSize,
      graphGridColor, setGraphGridColor,
      hoveredDate, setHoveredDate }}>
      { children }
    </Context.Provider>
  );
};

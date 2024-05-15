import React, {useEffect, useState} from 'react';
import { detectDevice } from './App';
import { fetchRemoteHabitsForUser, pushHabitsForUser, checkForHabitsChange } from './utils/habitUtils';

const mobile = detectDevice();

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-2)

  function convertToYYYYMMDD(date) {
    const tempYear = date.getFullYear();
    const tempMonth = date.getMonth()+1;
    const tempDay = date.getDate();

    return tempYear + '/' + tempMonth + '/' + tempDay;
  }

  const localStorage = window.localStorage;
  const lightModeStorage = localStorage.getItem('lightMode_cullen')

  // appearance
  const [lightMode, setLightMode] = useState(Boolean(lightModeStorage));
  const [graphFontColor, setGraphFontColor] = useState('rgb(0,0,0)');
  const [graphLineColor, setGraphLineColor] = useState('rgb(0,0,0)');
  const [graphBgColor, setGraphBgColor] = useState('rgb(0,0,0)');
  const [graphStepSize, setGraphStepSize] = useState('0.2');
  const [graphGridColor, setGraphGridColor] = useState('rgb(0,0,0)');

  // habits
  var initHabit = {
    title: 'XXX_INIT_XXX',
    doneDates: []
  }
  const [habits, setHabits] = useState([initHabit]);
  const [newHabitText, setNewHabitText] = useState('');

  const TEST_USERNAME = 'zosh';
  

  // dates
  const [endDate, setEndDate] = useState(new Date());
  var tempEnd = new Date(endDate);
  var start = new Date();
  if (mobile)
    start.setDate(tempEnd.getDate() - 3);
  else
    start.setDate(tempEnd.getDate() - 21);
  const [startDate, setStartDate] = useState(start);

  function fetchAndSetHabits() {
    fetchRemoteHabitsForUser(TEST_USERNAME).then(resp => {
      console.log('fetching habits');
      const cleanDateHabits = resp.map(habit => ({
        ...habit,
        doneDates: habit.doneDates.map(date => new Date(date))
      }));
      if (JSON.stringify(habits) !== JSON.stringify(cleanDateHabits))
        setHabits(cleanDateHabits);
    });
  }

  useEffect(() => {
    console.log('init pageload');
    fetchAndSetHabits(true);
  }, []);

  useEffect(() => {
    if (habits[0].title !== 'XXX_INIT_XXX')
      pushHabitsForUser(TEST_USERNAME, habits);

    const intervalId = setInterval(() => { // runs every 3 seconds
      fetchAndSetHabits()
    }, 3000);
    return () => clearInterval(intervalId);
  }, [habits])

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
      graphGridColor, setGraphGridColor }}>
      { children }
    </Context.Provider>
  );
};

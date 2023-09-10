import React, {useState} from 'react';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const testHabits = [
    { id: 0, body: 'floss', doneDates: [new Date('2023/9/1'), new Date('2023/9/3')] },
    { id: 1, body: 'do 50 pushups', doneDates: [new Date('2023/8/28'), new Date('2023/9/1'), new Date('2023/9/6')] },
    { id: 2, body: 'learn how to do the worm', doneDates: [new Date('2023/9/8')] },
    { id: 3, body: 'swim', doneDates: [new Date('2023/9/4'), new Date('2023/9/6')] }
  ];

  // habits
  const [habits, setHabits] = useState(testHabits);
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

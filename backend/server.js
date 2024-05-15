// START SERVER
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// CONNECT TO MONGODB
const { mongoose } = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/habits';
mongoose.connect(url);

// CREATE SCHEMAS & MODELS
const userSchema = new mongoose.Schema({
  username : { type: String, required: true, unique: true },
  email : { type: String, required: true, unique: true },
  created_date : { type: Number, required: true },
  updated_date : { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);
User.init().then(() => {
  console.log('User indexes created');
});

const habitSchema = new mongoose.Schema({
  owner_username : { type : String, required : true },
  title : { type: String, required: true },
  doneDates: { type: [String], required: true },
  frequency : String,
  status : String,
  created_date : { type: Number, required: true },
  updated_date : { type: Number, required: true }
})

const Habit = mongoose.model('Habit', habitSchema);
Habit.init().then(() => {
  console.log('Habit indexes created');
});

// ALLOW APP TO PROCESS JSON IN REQUEST BODY
app.use(express.json());

// ROUTE ENDPOINTS
// create new user
app.post('/api/users/', async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const date = new Date().getTime();

    const user = new User({ username: username, email: email, created_date: date, updated_date: date });
    await user.save();
    res.status(201).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get user info
app.get('/api/users/', async (req, res) => {
  try {
    const username = req.query.username;
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(404).json({ message : 'User not found' })
    res.json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all habits for user
app.get('/api/habits/', async (req, res) => {
  try {
    const username = req.query.username;
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(404).json({ message : 'User not found' })
    const user_habits = await Habit.find({ owner_username: username });
    res.json(user_habits);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create new habit for user
app.post('/api/habits/', async (req, res) => {
  try {
    const username = req.body.username;
    const newHabitTitle = req.body.title;
    const date = new Date().getTime();

    // check user exists
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(404).json({ message: 'User not found'});

    const newHabit = new Habit({ 
      owner_username: username, 
      title: newHabitTitle, 
      doneDates: [], 
      created_date: date, 
      updated_date: date 
    });
    await newHabit.save();

    res.status(201).json(newHabit);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update habit dates
app.patch('/api/habits/', async (req, res) => {
  try {
    const habitId = req.body.id;
    const newDates = req.body.dates;
    const updated_date = new Date().getTime();
    
    // validation
    if (!Array.isArray(newDates))
      return res.status(400).json('Dates must be in an array');
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    for (const date of newDates) {
      const tempDate = new Date(date);
      if (!regex.test(date) || !(tempDate instanceof Date && !isNaN(tempDate)))
        return res.status(400).json('Invalid date in date array');
    };
    
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, { 
      $set: { doneDates: newDates , updated_date: updated_date }
    }, { new: true });
    if (!updatedHabit)
      return res.status(404).json({ message: 'Habit not found' });

    res.json(updatedHabit);
  } 
  catch (error) {
    res.status(500).json('Error updating habit');
  }
});

app.put('/api/habits', async (req, res) => {
  try {
    const username = req.body.username;
    const newHabits = req.body.habits;
    
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(404).json({ message : 'User not found' });
    const existingHabits = await Habit.find({ owner_username: username });

    // delete habits not in the new set
    const habitsToDelete = existingHabits.filter(oldHabit => !newHabits.some(newHabit => newHabit._id === oldHabit._id.toString()));
    await Habit.deleteMany({_id: {$in: habitsToDelete.map(habit => habit._id)}});

    // update habits that are in both sets
    const habitsToUpdate = existingHabits.filter(oldHabit => newHabits.some(newHabit => newHabit._id === oldHabit._id.toString()));
    var updatedHabits = 0;
    for (let habit of habitsToUpdate) {
      const updatedData = newHabits.find(newHabit => newHabit._id == habit._id.toString());

      // if date arrays are different, update the object
      function dateArraysAreEqual() {
        var arr1 = habit.doneDates;
        var arr2 = updatedData.doneDates;
        if (arr1.length !== arr2.length) {
          return false;
        }
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
              return false;
          }
        }
        return true;
      }

      if (!dateArraysAreEqual()) {
        const updatedDate = new Date().getTime();
        console.log(updatedDate);
        habit.doneDates = updatedData.doneDates;
        habit.updated_date = updatedDate;
        updatedHabits++;
      }
      
      await habit.save();
    }

    // create habits that are not in the existing set
    const habitsToCreate = newHabits.filter(newHabit => !existingHabits.some(oldHabit => newHabit._id === oldHabit._id.toString()));
    const date = new Date().getTime();
    await Habit.insertMany(habitsToCreate.map(habit => ({
      ...habit,
      owner_username: username,
      created_date: date,
      updated_date: date
    })));
    res.status(200).json({ deleted: habitsToDelete.length, updated: updatedHabits, created: habitsToCreate.length});
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete habit
app.delete('/api/habits/', async (req, res) => {
  try {
    const habitId = req.query.id;
    const result = await Habit.findByIdAndDelete(habitId);

    if (result)
      res.json(`Habit ${habitId} was deleted`);
    else
      res.status(404).json(`Habit with ID ${habitId} was not found`);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
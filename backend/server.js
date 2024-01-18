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
  email : { type: String, required: true, unique: true }
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
  status : String
})

const Habit = mongoose.model('Habit', habitSchema);
Habit.init().then(() => {
  console.log('Habit indexes created');
});

// ALLOW APP TO PROCESS JSON IN REQUEST BODY
app.use(express.json());

// TODO: DELETE EXAMPLE DATA
// const user1 = new User({ user_id : "123", username : "josh", email : "hello@joshcullen.co" })
// const habit1 = new Habit({ habit_id: "456", owner_username : user1.username, title: 'drink water', doneDates: ["2024/01/15", "2024/01/17"] })
// user1.save()
//   .then(
//     () => console.log('user added'),
//     (err) => console.log(err)
//   );
// habit1.save()
//   .then(
//     () => console.log('habit added'),
//     (err) => console.log(err)
//   );
// TODO: DELETE EXAMPLE DATA

// ROUTE ENDPOINTS
// create new user
app.post('/api/users/', async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;

    const user = new User({ username: username, email: email });
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

    // check user exists
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(404).json({ message: 'User not found'});

    const newHabit = new Habit({ habit_id: 'xyz', owner_username: username, title: newHabitTitle, doneDates: []});
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
    
    // validation
    if (!Array.isArray(newDates))
      return res.status(400).json('Dates must be in an array');
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    for (const date of newDates) {
      const tempDate = new Date(date);
      if (!regex.test(date) || !(tempDate instanceof Date && !isNaN(tempDate)))
        return res.status(400).json('Invalid date in date array');
    };
    
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, { $set: { doneDates: newDates } }, { new: true });
    if (!updatedHabit)
      return res.status(404).json({ message: 'Habit not found' });
    res.json(updatedHabit);
  } 
  catch (error) {
    res.status(500).json('Error updating habit');
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
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const { mongoose } = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/habits';

mongoose.connect(url);

// example schema and model
const userSchema = new mongoose.Schema({
  user_id : { type: String, required: true, unique: true },
  username : { type: String, required: true, unique: true },
  email : { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

const habitSchema = new mongoose.Schema({
  habit_id : { type: String, required: true, unique: true },
  owner_username : { type : String, required : true },
  title : { type: String, required: true },
  doneDates: { type: [String], required: true },
  frequency : String,
  status : String
})
const Habit = mongoose.model('Habit', habitSchema);

const user1 = new User({ user_id : "123", username : "josh", email : "hello@joshcullen.co" })

const habit1 = new Habit({ 
  habit_id: "456", owner_username : user1.username, title: 'drink water', doneDates: ["2024/01/15", "2024/01/17"] 
})

user1.save()
  .then(
    () => console.log('user added'),
    (err) => console.log(err)
  );

habit1.save()
  .then(
    () => console.log('habit added'),
    (err) => console.log(err)
  );

app.get('/api/habits', (req, res) => {
  Habit.find({}).then(docs => {
    res.send(docs);
  }).catch(err => console.log('error occurred, ' + err));
});
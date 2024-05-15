export function generateHabit(id, body, dates) {
  const habitObject = {
    id: id,
    title: body,
    doneDates: dates
  };

  return habitObject;
}

export async function fetchRemoteHabitsForUser(username) {
  return fetch(`/api/habits?username=${username}`)
    .then(resp => {
      if (!resp.ok)
        throw new Error('error fetching habits for user');
      return resp.json();
    })
    .catch(error => { throw error });
}

// overwrites the remote habits with whatever is the current state of local
export async function pushHabitsForUser(username, habits) {
  const cleanHabits = habits.map(habit => ({
    _id: habit._id,
    title: habit.title,
    doneDates: habit.doneDates.map(date => `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`)
  }));

  const bodyJson = {
    "username" : username,
    "habits" : cleanHabits
  }
  
  const options = {
    method: 'PUT',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(bodyJson)
  }

  return fetch(`/api/habits`, options)
    .then(resp => {
      if (!resp.ok)
        throw new Error('error writing habits for user');
      return resp.json();
    })
    .catch(error => { throw error });
}
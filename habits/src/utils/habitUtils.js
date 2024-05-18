export function generateHabit(id, body, dates) {
  const habitObject = {
    id: id,
    title: body,
    doneDates: dates
  };

  return habitObject;
}

export async function checkUserExists(username) {
  if (username) {
    return fetchUserInfo(username).then(resp => {
      if (!resp) {
        console.log('user does not exist');
        return false
      }
      else {
        console.log('user does exist');
        return true;
      }
    })
  }
}

export async function fetchUserInfo(username) {
  return fetch(`/api/users?username=${username}`)
    .then(resp => {
      if (resp.ok)
        return resp.json();
      else if (resp.status === 404)
        return null
      else
        throw new Error('error fetching user info');
    })
    .catch(error => { throw error });
}

export async function createUser(username, password) {
  const bodyJson = {
    "username" : username,
    "password" : password
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(bodyJson)
  }

  return fetch(`/api/users`, options)
    .then(resp => {
      if (!resp.ok)
        throw new Error('could not create user');
      else
        return resp.json();
    })
    .catch(error => { throw error })
    .then(() => { fetchRemoteHabitsForUser(username); })
}

export async function verifyPassword(username, password) {
  const bodyJson = {
    "username" : username,
    "password" : password
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(bodyJson)
  }

  return fetch(`/api/login`, options).then(resp => {
    if (resp.ok)
      return true
    else
      return false
  })
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
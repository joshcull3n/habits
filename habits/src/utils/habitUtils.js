export function generateHabit(id, body, dates) {
  const habitObject = {
    id: id,
    body: body,
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

// compares the updated_date on the user and localStorage to determine which is the source of truth
export async function getSyncedHabits(username, localHabits, remoteHabits) {
  let syncedHabits = [];

  // get remote habits
  const localMap = new Map(localHabits.map(localHabit => [localHabit._id, localHabit]));
  const remoteMap = new Map(remoteHabits.map(remoteHabit => [remoteHabit._id, remoteHabit]));
  
  // compare remote to local
  remoteMap.forEach(remoteHabit => {
    const localMatch = localMap.get(remoteHabit._id);
    
    if (localMatch) {
      // if updated_date is different, sync the newest
      var latestHabit = localMatch;
      if (remoteHabit.updated_date > localMatch.updated_date)
        latestHabit = remoteHabit;
      syncedHabits.push(latestHabit);
    }
    else { // if habit is missing from local, sync it
      syncedHabits.push(remoteHabit);
    }
  });
  
  // compare local to remote
  localMap.forEach(localHabit => {
    const remoteMatch = remoteMap.get(localHabit._id);
    if (!remoteMatch) // if habit is missing from remote, sync it
      syncedHabits.push(localHabit);
  })

  return syncedHabits;
}
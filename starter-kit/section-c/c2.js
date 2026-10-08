/*
 * C2 — Callbacks to async/await
 *
 * Which two calls could have run concurrently, and why the third could not:
 * getUser must run first, because it gives teamId
 * After that, getTeam and getProjects both only need teamId-
 * so those two can run together with Promise.all
 * getUser cannot run together with others because,
 * the others need its result
 */

function getUser(id, callback) {
  setTimeout(() => callback(null, { id, name: 'Asha', teamId: 7 }), 300);
}

function getTeam(teamId, callback) {
  setTimeout(() => callback(null, { teamId, name: 'Platform' }), 300);
}

function getProjects(teamId, callback) {
  setTimeout(() => callback(null, ['api', 'dashboard']), 300);
}

// ---- original (callback pyramid) ---------------------------------------
// getUser(1, (err, user) => {
//   if (err) return console.error(err);
//   getTeam(user.teamId, (err, team) => {
//     if (err) return console.error(err);
//     getProjects(team.teamId, (err, projects) => {
//       if (err) return console.error(err);
//       console.log(user.name, team.name, projects);
//     });
//   });
// });

// ---- your rewrite: promisify, then async/await with ONE error path ------

// TODO

function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

const getUserAsync = promisify(getUser);
const getTeamAsync = promisify(getTeam);
const getProjectsAsync = promisify(getProjects);

async function run() {
  try {
    const user = await getUserAsync(1); // must be first

    // these 2 can run together because both just need teamId
    const [team, projects] = await Promise.all([
      getTeamAsync(user.teamId),
      getProjectsAsync(user.teamId)
    ]);

    console.log(user.name, team.name, projects);
  } catch (err) {
    // one error path for all
    console.error(err);
  }
}

run();
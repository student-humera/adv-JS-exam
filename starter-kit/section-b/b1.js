/*
 * B1 — The array comes back empty
 *
 * (a) The bug in one line: 
 * ids.forEach(async (id) => {
 * --forEach does not wait for async callbacks
 * })
 *
 * (b) Root cause (2-3 lines):
 * so basically forEach fires async function but,
 * doesn't return and await the promises.
 * So return users runs immediately while fetches are still pending,
 * in empty array.
 * 
 * Sequential or concurrent, and why:
 * should be concurrent with Promise.All
 * all user fetches are independenr, so we can fetch them - 
 * much faster than sequential for...of with await inside it
 */

// ---- original (buggy) ------------------------------------------------
// async function loadUsers(ids) {
//   const users = [];
//
//   ids.forEach(async (id) => {
//     const res = await fetch(`https://dummyjson.com/users/${id}`);
//     users.push(await res.json());
//   });
//
//   return users;
// }

// ---- your fix ----------------------------------------------------------

async function loadUsers(ids) {
  // TODO
  const users = await Promise.all(
  ids.map(async (id) => {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
   return await res.json();
  // return users;
  })
);
   return users;
}

loadUsers([1, 2, 3]).then((users) => console.log(users.length));

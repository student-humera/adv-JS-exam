/*
 * B3 — The private data isn't private
 *
 * (a) Leak on the way IN:
 * const users = initialUsers assigns the same reference
 * If we push to users
 *  we also mutate the original seed array outside
 *
 * (b) Leak on the way OUT:
 * return users returns the internal array reference.
 * caller can do 
 * list.length = 0 or list.push() and destroy our private store
 * 
 * What `const users` actually protects, and what it does not:
 * const only protects reassignment — you can't do users = []. 
 * It does not protect mutation
 */

// ---- original (buggy) ------------------------------------------------
// function createUserStore(initialUsers = []) {
//   const users = initialUsers;
//
//   return {
//     add: (user) => {
//       users.push(user);
//       return users;
//     },
//     all: () => {
//       return users;
//     },
//   };
// }

// ---- your fix ----------------------------------------------------------

function createUserStore(initialUsers = []) {
  // TODO 
 const users = [...initialUsers];

  return {
    add: (user) => {
      users.push(user);
      return [...users];
    },
    all: () => {
      return [...users];
    },
  };
}

const seed = [{ name: 'Asha' }];
const store = createUserStore(seed);

store.add({ name: 'Ravi' });
console.log(seed.length);        // must be 1

const list = store.all();
list.length = 0;
console.log(store.all().length); // must be 2

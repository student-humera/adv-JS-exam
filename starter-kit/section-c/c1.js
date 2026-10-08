/*
 * C1 — Imperative loop to a functional pipeline
 *
 * Requirements:
 *  - use filter, map and reduce
 *  - `orders` must be completely untouched afterwards
 *  - the GST step must use a CURRIED helper,
 *  e.g. applyTax(0.18)
 *
 * What improved, and what I traded away:
 * improved: Pure,  no mutation, declarative, readable, reusable curried tax helper
 * traded away: 2 loops instead of 1 (filter + map), slightly more memory for new objects.
 * 
 */

const orders = [
  { id: 1, city: 'Hyderabad', amount: 1200, status: 'delivered' },
  { id: 2, city: 'Pune', amount: 300, status: 'cancelled' },
  { id: 3, city: 'Hyderabad', amount: 4500, status: 'delivered' },
  { id: 4, city: 'Chennai', amount: 900, status: 'delivered' },
  { id: 5, city: 'Hyderabad', amount: 250, status: 'delivered' },
];

orders.map

console.log('before:', orders[0].amount);

// ---- original (imperative) ---------------------------------------------
// let total = 0;
// let count = 0;
//
// for (let i = 0; i < orders.length; i++) {
//   if (orders[i].status === 'delivered' && orders[i].city === 'Hyderabad') {
//     orders[i].amount = orders[i].amount * 1.18;
//     total = total + orders[i].amount;
//     count++;
//   }
// }
//
// console.log(total, count, total / count);

// ---- your rewrite -------------------------------------------------------

// TODO
//curried helper is required
const applyTax = (rate) => (amount) => amount * (1 + rate);
const addGST = applyTax(0.18);

const hyderabadDelivered = orders.filter(
  (o) => o.status === 'delivered' && o.city === 'Hyderabad'
);

const withGST = hyderabadDelivered.map((o) => ({
 ...o,
  amount: addGST(o.amount),
}));

const { total, count } = withGST.reduce(
  (acc, o) => ({ total: acc.total + o.amount, count: acc.count + 1 }),
  { total: 0, count: 0 }
);

const avg = count? total / count : 0;

console.log(total, count, avg);

console.log('after:', orders[0].amount); // must equal the "before" value

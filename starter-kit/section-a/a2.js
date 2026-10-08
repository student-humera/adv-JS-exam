// A2 — Predict the output (5 marks)
// Write your prediction BEFORE running this file.

function makeAdders() {
  const adders = [];
  for (var i = 1; i <= 3; i++) {
    adders.push((x) => x + i);
  }
  return adders;
}

const [a1, a2, a3] = makeAdders();
console.log(a1(10), a2(10), a3(10));

// Output:
14, 14 ,14



// Reasoning:
All functions use var i so they share same i. 
Loop finishes and i becomes 4. 
So 10+4=14 for all three. 
If we use let, each loop gets its own i — 1,2,3 — so we get 11,12,13.
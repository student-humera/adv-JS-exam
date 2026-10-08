// A3 — Predict the output (5 marks)
// Write your prediction BEFORE running this file.

async function first() {
  console.log('1');
  await second();
  console.log('2');
}

async function second() {
  console.log('3');
}

console.log('4');
first();
console.log('5');

// Output: 
4, 5, 1, 3, 2


// Reasoning:
1st the console.log('4') is sync , runs 1st //4,
first() startTransition, it logs '1' //1
await second() calls second() //3
await pauses first() and GPUDeviceLostInfo, so it logs the ('5') //5
after sync code finishes , paused first() continues and logs '2'
finally it is 4 1 3 5 2  

// .............

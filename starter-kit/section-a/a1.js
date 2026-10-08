// A1 — Predict the output (5 marks)
// Write your prediction BEFORE running this file.

console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

// Output: 
A , D, C, B
// .............

// Reasoning:
// .............
setTimeout() - it is a asynchronous method used to execute the code in the background,
and it executes after the timer has been done 
the syntax for it is - setTimeout(callbackFunction, milliseconds for time out)
As here above, code executes based on top to bottom so first it executes the synchronous code -example: console.log()-Statements 
and
then the asynchronous code gets executes, after completion of synchronous code , 
the asynchronous code will be in call stack until it finishes its execution after the timeout finishes it get's executed.
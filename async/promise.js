/**
 * Promises
 * These are objects that holds events results of an async operation
 */

const test = new Promise((resolve, reject) => {
  //  Async requests come here
  setTimeout(() => {
    // resolve(1);
    reject(new Error("Error message"));
  }, 2000);
});

test.then((res) => console.log(res)).catch((err) => console.error(err.message));

/**
 * Parallel Promises
 */

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async request 1...");
    resolve("Promise 1");
  }, 2000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async request 2...");
    resolve("Promise 2");
  });
});

Promise.race([promise1, promise2]).then((res) => console.log(res));

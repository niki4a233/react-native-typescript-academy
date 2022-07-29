const LIMIT = 10;

const asynnIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next() {
        const done = i >= LIMIT;
        const value = done ? undefined : i++;
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000, {value, done});
        });
      },
      return() {
        console.log(`Interupted prematurely`);
        return { done: true };
        //this metod is called if teh consumer calles break or treturn early in the loop
      }
    }
  }
};

(async () => {
  try {
    for await (const num of asynnIterable) {
      console.log(num);
      if (num === 3) break;
    }
  } catch (err) {
    console.log(`Catched ERROR:`, err);
  }
})();

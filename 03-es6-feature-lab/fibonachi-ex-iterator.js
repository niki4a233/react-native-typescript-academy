const fibonacci = {
    [Symbol.iterator]() {
      let n1 = 0, n2 = 1, value;
      return {
        next() {
          
          [value, n1, n2] = [n1, n2, n1 + n2];
   
         
          return {value};
        }
      };
    }
  };
   
  
  for (const n of fibonacci) {
    if (n > 100) break;
    console.log(n);
   
  }
let i;
let fib = [0, 1]; 


function* makeRangeIterator(start = 0, end =Infinity, step = fib)
{
  let iterationCount = 0;
  for (let i = start; i < end;i +=step){
    iterationCount++;
    yield i;
  }
  return iterationCount
}

for (i = 2; i <= 21; i++) {
  
  fib[i] = fib[i - 2] + fib[i - 1];
  console.log(fib[i]);
}
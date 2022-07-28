function* fibonacci() {
    var a = 0;
    var b = 1;
    while (true) {
      var current = a;
      a = b;
      b = current + a;
      yield current;
    }
  }
  
  
  var fib = fibonacci();
  
  
  for (let i = 0; i < 10; i++) {
    console.log(fib.next().value);
  }
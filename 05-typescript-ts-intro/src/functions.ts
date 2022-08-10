
import { PointImp1} from "./interfaces.js"
type PrinterFunc = {
  (a: string): void;
  description?: string;
};
interface PrinterFunc2 {
  (a: string): void;
}

function greeter(fn: PrinterFunc) {
  // higer order fucntion
  fn(`Hello, World - ${fn.description}`);
}

function goodbyer(fn: PrinterFunc) {
  // higer order fucntion
  fn(`Have a nice day! - ${fn.description}`);
}

function printToConsole(s: string) {
  console.log(s);
}
printToConsole.description = "Print to console";

function printToHTML(s: string) {
  const elem = document.getElementById(`results`);
  if (elem != null) {
    elem.innerHTML += s + "<br>";
  }
 
}
printToHTML.description = "Print data to innerHTML of 'results' <div> ";

greeter(printToConsole);
greeter(printToHTML);
goodbyer(printToConsole);
goodbyer(printToHTML);

class SomeObject {
  constructor(public name: string) {}
}

class SomeOtherObject {
    constructor(public name: string) {}
}

type SomeConstructor<T> = {
  new (s: string): T;
};


// function fn(ctor: SomeConstructor) {
//   return new ctor("hello");

function factory(ctor: SomeConstructor <SomeObject | SomeOtherObject>){
    return  new ctor("Hello");
}
console.log(factory(SomeOtherObject));
console.log(factory(SomeObject))


function firstElement<T>(arr: T[]):T | undefined{
    return arr[0];
  }
  console.log(firstElement(['abc', 'def'])!.toUpperCase)



  function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }
  // Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
const results = map([new PointImp1(1,2,3), new PointImp1(4,5,6), new PointImp1(7,8,9),], 
p => p.format());

console.log(parsed);
console.log(results);
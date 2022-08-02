/* eslint-disable @typescript-eslint/no-unused-vars */
function greeter(name: string, date: Date= new Date()):string{
    return `Hello ${name} from Typescript on ${date.toDateString()}`;
}
document.getElementById(`results`,)!.innerHTML = greeter('Traqn');

// const elem = document.getElementById(`results`);
// if (elem != null){

// elem.innerHTML= greeter('Gogo');
// }
function printId(id: number | string) {
    if (typeof id ==="string"){
    console.log("Your ID is: " + id.toUpperCase());
}else {
    console.log("Your ID is:",+ ++id);
}
  }
  function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }

  printId(42);
  printId("dsfsdfsdfdsf23");
  welcomePeople(["Dimitar", "Ivan", "Hristo"]);

  function logValue(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toUTCString());
                
    } else {
      console.log(x.toUpperCase());
    }
  }
  logValue("Traqn");


// nov primer
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

// NOV PRIMER



function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
  
  function getSmallPet(){
    
    return Math.random() < 0.5 ? {swim() {return}} as Fish :{ fly() { return; } } as Bird}
    const pet = getSmallPet();
    
  
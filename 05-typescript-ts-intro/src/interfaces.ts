

// type Point = {
//     x: number;
//     y: number;
//     z?: number;
//     [key: string]: number

    
//   };
  export interface Point {
    x: number;
    y: number;
    z?: number;
    format(): string;

  }
  export class PointImp1 implements Point{
    constructor(
        public x: number,
        public y: number,
        public z: number = 0 ){}
      [key: string]: number;
        format():  string{
            return `[${this.x},${this.y},${this.z}]`;
        }
    
}


  function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
    for ( const key in pt)
{
    console.log(`The coordinate's ${key} y value is ${pt[key]}`);
}  }
   
  printCoord({ x: 100, y: 100 , w: 42, const: 42});

  const req = { url: "https://example.com", method: "GET" };
  handleRequest(req.url, req.method as "GET");
function handleRequest(url: string, method: "GET" | "POST"){
    return console.log(url + method);

}
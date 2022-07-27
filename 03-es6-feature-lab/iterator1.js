const myIterable = (from = 0 , to = 10, step = i) => ({
    [Symbol.iterator]() {
        let i = from - step;
        return{
           next() 
                   {
             i+=step;
               return
                     {
                  value:i,
                  done: i >= to
                     }
                   }
               }

            }
        })

for (const e of myIterable){
    console.log(e);
}
for (const e of myIterable){
    console.log(e);
}
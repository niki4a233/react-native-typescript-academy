const myIterable = (from = 0 , to = 10, step = i) => ({
    [Symbol.iterator]:function*() { //generator function
        for(let i=from ; i<to ;i +=step ){
            yield i;  //return 
        }
    }
}
);
        

for (const e of myIterable()){
    console.log(e);
}
for (const e of myIterable(10, 100, 10)){
    console.log(e);
}
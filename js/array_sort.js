'use strict';

let sortArray = [
    {name:'mirinae', age:23},
    {name:'mirinae', age:21},
    {name:'mirinae', age:2},
    {name:'mirinae', age:34},
    {name:'mirinae', age:55},
];


console.log('>>> before');
console.log(sortArray);

sortArray.sort((a,b)=>{
    if(a.age>b.age) {
        return 1;
    }
    if(a.age<b.age) {
        return -1;
    }
    return 0
});



console.log('>>> after');
console.log(sortArray);
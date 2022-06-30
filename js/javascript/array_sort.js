'use strict';

let sortArray = [
    {name:'mirinae1', age:23},
    {name:'mirinae3', age:21},
    {name:'mirinae7', age:2},
    {name:'mirinae4', age:34},
    {name:'mirinae2', age:55},
];

let beforeArray = JSON.parse(JSON.stringify(sortArray));

sortArray.sort((a,b)=>{
    if(a.age>b.age) {
        return 1;
    }
    if(a.age<b.age) {
        return -1;
    }
    return 0;
});

console.log('>>> before');
console.log(beforeArray);

console.log('>>> after');
console.log(sortArray);
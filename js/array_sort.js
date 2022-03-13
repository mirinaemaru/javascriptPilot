'use strict';

let sortArray = [
    {name:'mirinae1', age:23},
    {name:'mirinae3', age:21},
    {name:'mirinae7', age:2},
    {name:'mirinae4', age:34},
    {name:'mirinae2', age:55},
];


console.log('>>> before');
console.log(sortArray);


sortArray.sort((a,b)=>{
    if(a.name>b.name) {
        return 1;
    }
    if(a.name<b.name) {
        return -1;
    }
    return 0;
});



console.log('>>> after');
console.log(sortArray);
'use strict';

let obj = [
    {name:'mirinae1', age:23, calc:()=>{console.log(this.age)} },
    {name:'mirinae3', age:21},
    {name:'mirinae7', age:2},
    {name:'mirinae4', age:34},
    {name:'mirinae2', age:55},
];

let beforeObj = {...obj};
let beforeObj2 = JSON.parse(JSON.stringify(obj));
console.log('>>> before');
console.log(beforeObj);
console.log(beforeObj2);


obj.sort((a,b)=>{
    if(a.age>b.age) {
        return 1;
    }
    if(a.age<b.age) {
        return -1;
    }
    return 0;
});



console.log('>>> after');
console.log(obj);
console.log(Object.values(obj));
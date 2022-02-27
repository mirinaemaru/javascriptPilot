'use strict';

function machine() {
    this.q = 'strike';
    this.w = 'snowball'
}

var nunu = new machine();
console.log(nunu);

console.log(machine.prototype);


machine.prototype.name = 'park';
console.log(machine.prototype);
console.log(nunu.name);

let sampleArr = [1,4,5,62,3];
console.log(sampleArr);
console.log(sampleArr.sort());

sampleArr.prototype.help = function(){
    console.log('test');
}
console.log(sampleArr.prototype.help);
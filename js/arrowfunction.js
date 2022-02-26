'use strict';

let x = 'y';
console.log( `${x}`);

function printHello() {
    console.log("Hello");
}
printHello();


function log(message) {
    console.log(message);
}
log("Hello");
log(1234);


// 2. Parameter
function changeName(obj) {
    obj.name = "coder";
}
const mirinae = { name:"mirinae"};
changeName(mirinae);
console.log(mirinae);



// 3. Default Parameter( added in ES6)
function showMessage( message, from= '나님') {
    console.log( `${message} by ${from}`);
}
showMessage("Hi~~");


// 4. Rest Parameter ( added in ES6)
function printAll(...args) {
    for( let i=0; i<args.length; i++) {
        console.log(  args[i] );
    }

    for( const arg of args ) {
        console.log(  arg );
    }

    args.forEach((arg)=>console.log(arg));
}
printAll('dream','coding','ellie');


// 5. Local Scope
let globalMessage = "global";
function printMessage() {
    let message = "hello";
    console.log(message);
    console.log(globalMessage);
}
printMessage();



// 2. Callback function using function expression.
function randomQuiz(answer, printYes, printNo) {
    if( answer==='love you') {
        printYes();
    }
    else {
        printNo();
    }
}
// anonymous function
const printYes = function() {
    console.log("Yes");
}
// named function
// better debugging in debugger's stack trace
// recursions
const printNo = function print() {
    console.log("No!");
    // print();
}
randomQuiz("wrong", printYes, printNo);
randomQuiz("love you", printYes, printNo);



// Arrow Function
// always anonymous
const simplePrint = function() {
    console.log('simplePrint');
}
const simplePrint2 = ()=> console.log('simplePrint2');
const add = (a,b)=>a+b;// 리턴까지 수행
console.log(add(1,2));

// IIFE: Immediately Invoked Function Expression
(function hello() {
    console.log('Hello IIFE' );
})();

(function hello(name) {
    console.log(`Hello IIFE ${name}` );
})('mirinae');

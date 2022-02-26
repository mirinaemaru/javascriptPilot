'use strict'

// 2. variable

let globalName = 'global name';

{
    let name = 'mirinae';
    console.log( name );
    console.log( globalName );
}

console.log( globalName );

const maxNumber = 5;
console.log( maxNumber );

// 일급객체, first class function

// short, int, long, float, double
// number

let a = 1;
let b = 2;
console.log(a);
console.log(b);

// number
const count = 19;
const size = 19.23;
console.log( `value: ${count}, type: ${typeof count}`);
console.log( `value: ${size}, type: ${typeof size}`);

const infinity = 1/0;
const negativeInfinity = -1/0;
const nAn = 'hello'/2;
console.log( infinity );
console.log( negativeInfinity );
console.log( nAn );


// string
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello ' + brendan;
console.log( `value: ${char}, type: ${typeof char}`);
console.log( `value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`;
console.log( `value: ${helloBob}, type: ${typeof helloBob}`);

// boolean
// false, 0, null, undefined, NaN, ''
const canRead = true;
const test = 3 < 1; // false
console.log( `value: ${canRead}, type: ${typeof canRead}`);
console.log( `value: ${test}, type: ${typeof test}`);

// null
let noting = null;
console.log( `value: ${noting}, type: ${typeof noting}`);

// null
let x;
let y = undefined;
console.log( `value: ${x}, type: ${typeof x}`);
console.log( `value: ${y}, type: ${typeof y}`);


//  symbol, create unique identifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log( symbol1 == symbol2);
console.log( symbol1 === symbol2);
//console.log( `value: ${symbol1}, type: ${typeof symbol1}`);
console.log( `value: ${symbol1.description}, type: ${typeof symbol1}`);
console.log( `value: ${symbol1.description}, type: ${typeof symbol1}`);

const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log( gSymbol1 == gSymbol2);
console.log( gSymbol1 === gSymbol2);
console.log( `value: ${gSymbol2.description}, type: ${typeof gSymbol2}`);



// 5. Dynamic typing : dynamically typed language
let text = 'hello';
console.log( text.charAt(0));
console.log( `value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log( `value: ${text}, type: ${typeof text}`);
text = '7' / '5';
console.log( `value: ${text}, type: ${typeof text}`);
//console.log( text.charAt(0));

// object
const mirinae = {name:'mirinae', age:20}
console.log( mirinae );
console.log( `${mirinae.name}, ${mirinae.age}` );
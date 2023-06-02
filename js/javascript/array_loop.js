'use strict';

let arr = [1,2,3,4,5,6,7,8,9];

for( var i=0; i<arr.length; i++ ) {
    for( var j=i+1; j<arr.length; j++ ) {
        console.log( arr[i] +"\t"+ arr[j] );
    }
}
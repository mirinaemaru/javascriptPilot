'use strict';

var someone = {
    name: 'mirinae',
    whoAmI: function() {
        console.log(this);
    }
};
someone.whoAmI();

let myWhoAmI = someone.whoAmI;
myWhoAmI();
console.log( typeof myWhoAmI );
console.log( typeof someone.whoAmI() );
console.log( typeof someone.whoAmI() );
console.log( typeof someone.whoAmI );

var btn = document.getElementById('btn');
btn.addEventListener('click', someone.whoAmI);
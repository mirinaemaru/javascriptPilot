'use strict';

console.log( '>> jsRender 연습...' );

var myTmpl = $.templates("#personTemplate");

var people = [
    {name: "Adriana"},
    {name: "Robert"}
];

var html = myTmpl.render(people);
console.log(html);
$("#peopleList").html(html);
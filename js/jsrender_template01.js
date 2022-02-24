'use strict';

var myTmpl = $.templates("<label>Name:</label> {{:name}} ");

var people = [
    {name: "Adriana"},
    {name: "Robert"}
];

var html = myTmpl.render(people);

$("#peopleList").html(html);
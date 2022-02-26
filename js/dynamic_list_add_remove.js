'use strict';

let DYNAMIC_LIST = {
    init: ()=> {
        console.log( ">>> DYNAMIC_LIST..." );

        console.log( '>> dynamic_list_add_remove.js...' );
        let myTmpl = $.templates("#personTemplate");

        let people = [
            {name: "Adriana", id:"id01", age:"28"},
            {name: "Robert", id:"id02", age:"38"}
        ];

        let html = myTmpl.render(people);

        $("#peopleList").html(html);
        DYNAMIC_LIST.addList();
    },
    addList: ()=> {
        console.log( ">>> addList..." );
    },
    removeList: ()=> {
        console.log( ">>> removeList..." );
    }
}

$(function() {
    DYNAMIC_LIST.init();
});
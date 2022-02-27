'use strict';

// 1. 버튼에 이벤트 등록
let btn = document.getElementById('btn');

btn.addEventListener('click',function (event){
   console.log('btn click~');
});

btn.addEventListener('dblclick',function (event){
    console.log('btn double click~');
});



// 2. 이벤트 객체를 이용하면 복수의 엘리먼트에 하나의 리스너를 등록해서 재사용할 수 있다.
let t1 = document.getElementById('target1');
let t2 = document.getElementById('target2');

function btnListener(event) {
    switch (event.target.id) {
        case 'target1':
            console.log(1);
            break;
        case 'target2' :
            console.log(2);
            break;
    }
}
t1.addEventListener('click',btnListener);
t2.addEventListener('click',btnListener);



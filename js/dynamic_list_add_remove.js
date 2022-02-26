'use strict';

const DYNAMIC_LIST = {
    init: ()=> {
        console.log( ">>> DYNAMIC_LIST..." );

        console.log( '>> dynamic_list_add_remove.js...' );
        let myTmpl = $.templates("#personTemplate");

        let people = [
            {name: "Adriana", id:"id01", age:"28"},
            {name: "Robert", id:"id02", age:"38"},
            {name: "Mirinae", id:"id03", age:"18"}
        ];

        let html = myTmpl.render(people);

        $("#peopleList").html(html);
    },
    addList: function(e,_this, id) {
        let people = [
            {id:id, name: "", age:""}
        ];

        let myTmpl = $.templates("#listTemplate");
        let myHtml = myTmpl.render(people);
        $(e.target.parentNode.previousElementSibling).find(".list").append(myHtml)

    },
    removeList: (e,_this)=> {
        console.log( ">>> removeList..." );
        if( $(e.target).closest(".list").find("tr").length==1 ) {
            alert("전부는 삭제할 수 없습니다.");
        }
        else {
            $(e.target).closest("tr").remove();
        }
    },
    saveList: (e,_this)=> {
        console.log( ">>> saveList..." );

        let isNotEmpty = true;
        let idArr   = new Array();
        let nameArr = new Array();
        let ageArr  = new Array();

        $("input[name=id]").each((index,item)=>{
            idArr.push($(item).val());
        });

        $("input[name=name]").each((index,item)=>{
            if( $.trim($(item).val())=='' ) {
                alert("The input must not contain spaces.");
                $(item).focus();
                isNotEmpty = false;
                return false;
            }
            else nameArr.push($(item).val());
        });

        if( isNotEmpty ) {
            $("input[name=age]").each((index,item)=>{

                if( $.trim($(item).val())=='' ) {
                    alert("The input must not contain spaces.");
                    $(item).focus();
                    return false;
                }
                else ageArr.push($(item).val());
            });
        }


        let data = {};
        data.id = idArr;
        data.name = nameArr;
        data.age = ageArr;


        // duplication check
        const set = new Set();
        idArr.forEach(function (item, index){
            set.add(idArr[index] + nameArr[index] + ageArr[index]);
        })

        console.log( ">>> 전체 길이 : " + idArr.length );
        console.log( ">>> 중복 제거 길이 : " + set.size );

        // 전체 입력항목 길이와 중복제거한(Set에 입력) 길이가 다르면 중복 데이터가 있다고 판단.
        if( idArr.length != set.size ) {
            alert("Duplicated!");
            return false;
        }

        let data2 = [];
        idArr.forEach(function (item, index){
            data2.push({
               id:  idArr[index],
               name:nameArr[index],
               age: ageArr[index],
            });
        });

        console.log(data);
        console.log(data2);
        console.log(set);
    }
}

$(function() {
    DYNAMIC_LIST.init();
});

// init();
//
// function init(){
//     document.querySelector('form').addEventListener('submit', addToDo);
//     document.getElementById('clear').addEventListener('click', clearTodoList);
//     document.querySelector('ul').addEventListener('click', deleteOrCheck);
// }
//
// function deleteOrCheck(e){
//     if(e.target.className == 'delete')
//         deleteToDo(e); // X 버튼을 누르면 목록에서 항목 삭제
//     else {
//         checkToDo(e); // 체크박스를 클릭한 경우 글씨 색을 연하게 바꿔준다.
//     }
// }
//
// function deleteToDo(e){ // X 버튼을 누르면 목록에서 항목 삭제
//     let remove = e.target.parentNode;
//     let parentNode = remove.parentNode;
//     parentNode.removeChild(remove);
// }
//
// function checkToDo(e){  // 체크박스를 클릭한 경우 글씨 색을 연하게 바꿔준다.
//     const todo = e.target.nextSibling;
//     if(e.target.checked){
//         todo.style.color = "#dddddd";
//     }else {
//         todo.style.color = "#000000";
//     }
// }
//
// function clearTodoList(e){ //목록 전체 삭제하는 경우
//     let ul = document.querySelector('ul').innerHTML = '';
// }
//
// function addToDo(e){ //새로운 할 일 추가하는 경우
//     e.preventDefault();
//     let toDoValue = document.querySelector('input');
//     if(toDoValue.value !== '')
//         addTask(toDoValue.value);
//     toDoValue.value = ''; //입력창 비워주기
// }
//
// function addTask(value){
//     let ul = document.querySelector('ul');
//     let li = document.createElement('li');
//     li.innerHTML = `<span class="delete">x</span><input type="checkbox"><label>${value}</label>`;
//     ul.appendChild(li);
//     document.querySelector('.todolist').style.display = 'block';
// }
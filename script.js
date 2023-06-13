document.addEventListener("DOMContentLoaded",function(){
    let ainput= document.getElementById("amt");
    let dinput= document.getElementById("des");
    let cinput= document.getElementById("cat");
    let list=document.getElementById("list-container");

    function addToList(){
        
        if(ainput.value === ""||dinput.value === ""){
            alert("Enter Something...");
        }
        else{
        let amount=ainput.value;
        let desc=dinput.value;
        let categ=cinput.value;
        let c=document.createElement('li');
        c.textContent=amount+"-"+desc+"-"+categ;
        localStorage.setItem(desc,JSON.stringify({amount:amount,desc:desc,categ:categ}));

        let del=document.createElement('input');
        del.className='btna';
        del.type='button';
        del.value='Delete';
        del.onclick=function(){
            list.removeChild(c);
            localStorage.removeItem(desc);
            saveData();

        };

        let edit = document.createElement('input');
        edit.className = 'btnb';
        edit.type ='button';
        edit.value = 'Edit';
        edit.onclick = function () {
        dinput.value = desc;
        let Obj = JSON.parse(localStorage.getItem(desc));
        ainput.value = Obj.amount;
        list.removeChild(c);
        localStorage.removeItem(desc);
        saveData();
      };
         
        c.appendChild(del);
        c.appendChild(edit);     
        list.appendChild(c);
        ainput.value="";
        dinput.value="";
        cinput.value="";
        saveData();

        }
    }
    function saveData() {
        localStorage.setItem("data", list.innerHTML);
      }
    function showData(){
        list.innerHTML = localStorage.getItem("data");

    let deleteButtons = document.getElementsByClassName('btna');
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].onclick = function () {
        let listItem = this.parentNode;
        list.removeChild(listItem);
        let title = listItem.textContent;
        localStorage.removeItem(title);
        saveData();
      };
    }
    let editButtons = document.getElementsByClassName('btnb');
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].onclick = function () {
        let listItem = this.parentNode;
        let desc = listItem.textContent.split("-")[1].trim();
        let Obj = JSON.parse(localStorage.getItem(desc));
        ainput.value = Obj.amount;
        dinput.value = Obj.desc;
        list.removeChild(listItem);
        localStorage.removeItem(desc);
        saveData();
      };
    }
    } 
    showData(); 
    document.getElementById("submit").addEventListener("click",addToList);
})
let addToDoButton=document.getElementById('addToDo');
let toDoContainer=document.getElementById('toDoContainer');
let inputText=document.getElementById('inputText');
let clearToDoButton=document.getElementById('clearToDo');


addToDoButton.addEventListener("click",function(){

    let paragraph =document.createElement('p');
    paragraph.classList.add('paragraph-styling');  // style.css dosyasında bu classın stilini yazdık
    toDoContainer.appendChild(paragraph);
    paragraph.innerHTML=inputText.value;
    inputText.value="";

    paragraph.addEventListener('click',function(){  // eklediğimiz yazı üzerine bir kere tıkladığımızda yazı üzerine çizik atacak
        paragraph.style.textDecoration="line-through";
    });

    paragraph.addEventListener('dblclick',function(){ // yazı üzerine çift tıklayınca sayfadan kaldıracak
       toDoContainer.removeChild(paragraph);
       // paragraph.remove(); // ikinci yöntem
    });

    clearToDoButton.addEventListener("click",function(){
        paragraph.remove();
        //paragraph.style.display="none"; // ikinci yöntem
    });
});


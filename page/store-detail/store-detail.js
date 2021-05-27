const $btnCloth = document.getElementById('btn-cloth');
const $btnPants = document.getElementById('btn-pants');
const $btnshoose = document.getElementById('btn-shoose');
const $btnman = document.getElementById('btn-man');
const $btnwoman = document.getElementById('btn-woman');
const $clo = document.getElementsByClassName('clo-card');
const $man = document.getElementsByClassName('man');
const $woman = document.getElementsByClassName('woman');
const $shirts = document.getElementsByClassName('shirts');
const $pants = document.getElementsByClassName('pants');
const $shoose = document.getElementsByClassName('shoose');
const $clothsContainer = document.getElementsByClassName('cloths-container');
const $genricBtn = document.getElementsByClassName('genric-btn');
const $galleryItem = document.getElementsByClassName('gallery-item');
const $price = document.getElementsByClassName('price');
$btnPants.addEventListener("click",btnPants);
$btnshoose.addEventListener("click",btnshoose);
$btnman.addEventListener("click",btnman);
$btnwoman.addEventListener("click",btnwoman);
$btnCloth.addEventListener("click",btnCloth);

let sel = document.getElementById("sel1").addEventListener("change",function(){
    if(this.value == 'new'){
        Allhidden();
    }
    else if(this.value == 'row-price'){
        Allhidden();
    }
    else if(this.value == 'high-price'){
        Allhidden();
    }
    else if(this.value == 'like'){
        Allhidden();
    }
});
// 가격 구분 함수
function btnCloth(){
    Allhidden();
    ShowShirt();
}
function btnPants(){
    Allhidden();
    ShowPants();
}
function btnshoose(){
    Allhidden();
    ShowShoose();
}
function btnman(){
    Allhidden();
    ShowMan();
}
function btnwoman(){
    Allhidden();
    ShowWoman();
}
function Allhidden(){
    for(let i =0; i<$clo.length; i++){
        $clo[i].classList.add("clo-hidden");
    }
}

function ShowShirt(){
   for(let i =0; i<$shirts.length; i++){
       $shirts[i].classList.remove("clo-hidden");
   }
}
function ShowPants(){
    for(let i =0; i<$pants.length; i++){
        $pants[i].classList.remove("clo-hidden");
    }
}
function ShowShoose(){
    for(let i =0; i<$shoose.length; i++){
        $shoose[i].classList.remove("clo-hidden");
    }
}
function ShowMan(){
    for(let i =0; i<$man.length; i++){
        $man[i].classList.remove("clo-hidden");
    }
}
function ShowWoman(){
    for(let i =0; i<$woman.length; i++){
        $woman[i].classList.remove("clo-hidden");
    }
}

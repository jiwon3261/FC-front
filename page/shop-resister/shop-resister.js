const clickTagList = [];

const tagButton = Array.from(document.getElementsByClassName("tagButton"));
tagButton.map(element=>{
    element.addEventListener('click',tagClick);
})

function tagClick(){
    if(clickTagList.includes(this.innerText)){
        var indexOf = clickTagList.indexOf(this.innerText);
        clickTagList.splice(indexOf, 1);
        this.classList.toggle('btn-outline-primary');
        return;
    }

    if(clickTagList.length === 3) {
        alert('내 매장 태그는 3개까지만 허용합니다.');
        return;
    }
    this.classList.toggle('btn-outline-primary');
    var live_button = document.createElement("button");
    // live_button.classList.add("btn");
    // live_button.classList.add("btn-outline-primary");
    // live_button.classList.add("tagButton");
    // live_button.classList.add("tagButton_live");
    // live_button.innerHTML = this.innerHTML;
    // var live_button_list = document.querySelector("#tagAppend");
    // live_button_list.appendChild(live_button); 
    clickTagList.push(this.innerText);
    // clickTagList.push(live_button);
}

function setThumbnail(event) { 
    var reader = new FileReader(); 
    reader.onload = function(event) {
        var img = document.createElement("img"); 
        img.setAttribute("src", event.target.result); 
        document.querySelector("div#image_container").appendChild(img); }; reader.readAsDataURL(event.target.files[0]); 
    }


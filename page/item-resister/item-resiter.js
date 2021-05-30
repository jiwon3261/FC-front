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

    if(clickTagList.length === 2) {
        alert('상품 태그는 2개까지만 허용합니다.');
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
    var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-target", "#carouselExampleDark");
        button.setAttribute("data-bs-slide-to",10);
        button.setAttribute("aria-label","Slide 11");
        document.querySelector(".carousel-indicators").appendChild(button);
        // console.log(button);
        var div = document.createElement("div");
        div.setAttribute("class","carousel-item ss10");
        div.setAttribute("data-bs-interval","1000");
        // console.log(div);
        document.querySelector(".carousel-inner").appendChild(div);
    for (var image of event.target.files) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img_1 = document.createElement("img");
            img_1.setAttribute("src", event.target.result);
            img_1.setAttribute("class", "d-block w-100");
            document.querySelector(".ss10").appendChild(img_1);
        }
        // console.log(image);
        reader.readAsDataURL(image);
    }
  }
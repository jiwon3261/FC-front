function setThumbnail(event) {
    if(event.target.files.length >5) {
        alert("상품 이미지 등록은 5개까지만 가능합니다.222222222");
        return;
    }
    
    var cntImage = document.getElementsByClassName("carousel-item");
    // var cntImage_2 = document.getElementsByClassName("carousel-inner");
    // var cntImage_1 = cntImage_2.childNodes.length;
    // alert(cntImage_1);
    if(event.target.files.length + cntImage.length > 5){
        alert("상품 이미지 등록은 5개까지만 가능합니다.444444444444");
        return;
    }
    // if(cntImage.length > 0) {
    //    // alert(cnt(Image.length));
    //     var ss0 = document.getElementById("ss0");
    //     var carousel_inner = document.getElementById("carousel-inner");
    //     ss0.remove();
    // }

    var i=cntImage.length-1;
    for (var image of event.target.files) {
        var reader = new FileReader();
        reader.onload = function (event) {
            i++;
                var img_1 = document.createElement("img");
            img_1.setAttribute("src", event.target.result);
            img_1.setAttribute("class", "d-block w-100");
            setImage(i);
            document.querySelector(".ss"+i).appendChild(img_1);
            }            
        reader.readAsDataURL(image);
    }
    var ss0 = document.getElementById("ss0");
            console.log(ss0);
            // var carousel_inner = document.getElementById("carousel-inner");
            ss0.remove();
} 

function setImage(cnt) {
    var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-target", "#carouselExampleDark");
            button.setAttribute("data-bs-slide-to",cnt);
            button.setAttribute("aria-label","Slide "+ (cnt+1));
            document.querySelector(".carousel-indicators").appendChild(button);
            var div = document.createElement("div");
            div.setAttribute("class","carousel-item ss"+cnt);
            div.setAttribute("data-bs-interval","1000");
            document.getElementById("carousel-inner").appendChild(div);
            // var button = document.createElement("button");
            // button.setAttribute("type", "button");
            // button.setAttribute("data-bs-target", "#carouselExampleDark");
            // button.setAttribute("data-bs-slide-to",cnt);
            // button.setAttribute("aria-label","Slide "+ (cnt+1));
            // document.querySelector(".carousel-indicators").appendChild(button);
            // var div = document.createElement("div");
            // div.setAttribute("class","carousel-item ss"+cnt);
            // div.setAttribute("data-bs-interval","1000");
            // document.querySelector(".carousel-inner").appendChild(div)
            
        }
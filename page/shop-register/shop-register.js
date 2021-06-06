
/*대표이미지 등록하기*/
function setThumbnail(event) {
  var reader = new FileReader();
  reader.onload = function (event) {
    // fileCheck();
    var file = document.getElementById('image');
    //파일 경로.
    var filePath = file.value;
    //전체경로를 \ 나눔.
    var filePathSplit = filePath.split('\\'); 
    //전체경로를 \로 나눈 길이.
    var filePathLength = filePathSplit.length;
    //마지막 경로를 .으로 나눔.
    var fileNameSplit = filePathSplit[filePathLength-1].split('.');
    //파일명 : .으로 나눈 앞부분
    var fileName = fileNameSplit[0];
    //파일 확장자 : .으로 나눈 뒷부분
    var fileExt = fileNameSplit[1];
    //파일 크기
    var fileSize = file.files[0].size;
    
    if (fileExt != "jpg" && fileExt != "png" && fileExt && "gif" && fileExt != "bmp") {
      alert("해당 파일은 이미지 파일아닙니다.");   
      return;
  }
    if (document.querySelector("div>#image_container>img")!=null) {
      document.querySelector("div>#image_container>img").remove();
    }
    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);
    img.setAttribute("id", "thumbImg");
    document.querySelector("div>#image_container").appendChild(img);
  }
  reader.readAsDataURL(event.target.files[0]);
}

/*태그검색*/
$(document).ready(function() {
  $("#search").keyup(function() {
      var k = $(this).val();
      var temp = $( "#inputTag>button:contains('" + k + "')" ).css( 'color', 'red' );
      if($(this).val() == '') {
          $(temp).hover(function(){
              $(this).css('color','white');
          }, function() {
              $(this).css('color','var(--bs-teal');
          });
          $(temp).css('color','var(--bs-teal)');
          $(temp).show();
      }
      else {
          $("#inputTag > button").hide();
          $(temp).css('color','red');
          $(temp).hover(function(){
              $(this).css('color','red');
          })
          $(temp).show();
      }
  })
})

/*전화번호 */
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
                //   label_text.innerText = this.value + "  " + "원";
                //   label_text.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
setInputFilter(document.getElementById("inputPhone1"), function (value) {
  return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("inputPhone2"), function (value) {
  return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("inputPhone3"), function (value) {
  return /^\d*$/.test(value);
});


$(document).ready(function(){
  $('.input-phone').keyup (function () {
    var charLimit = $(this).attr("maxlength");
    if (this.value.length >= charLimit) {
        $(this).next().focus();
        return false;
    } else if(this.value == '02') {
      $(this).next().focus();
      return false;
    }
});
}); 
// /*요일 토글*/
// /*하다 맒 태그 3개까지 선택가능*/
// var btnDayList = [];
// $(document).ready(function() {
//   $(".btnday").click(function() {
//     if(btnDayList.includes(this.innerText)){    
//       var indexOf = btnDayList.indexOf(this.innerText);
//       btnDayList.splice(indexOf, 0);
//       console.log(btnDayList);
//     }
//     btnDayList.push(this.innerText);
//       // $(this).css('background-color','var(--bs-teal');
//       // $(this).css('color','white');
//       // console.log(this.innerText);
//       // if(btnDayList.includes($(this).innerText)){
//       //   console.log(btnDayList);
//       //   var indexOf = btnDayList.indexOf(this.innerText);
//       //     btnDayList.splice(indexOf, 1);
//       //     // $(this).classList.toggle('btn-outline-info');
//       //     return;
//       // }
//       // $(this).classList.toggle('btn-outline-info');
//     // f((this).css('color','white')) {
//     //   console.log(this);
//     // }
//   })
// })
// // console.log(tagButton[0].innerHTML);
// // btnday.addEventListener('click', ()=> {
// //     var btnday = Array.from(document.getElementsByClassName("btnday"));
// //         console.log(btnday);    
// //     if(clickDayList.includes(this.innerText)){
// //                 var indexOf = clickDayList.indexOf(this.innerText);
// //                 clickDayList.splice(indexOf, 1);
// //                 this.classList.toggle('btn-outline-primary');
// //                 return;
// //             }
        
// //             if(clickDayList.length === 3) {
// //                 alert('내 매장 태그는 3개까지만 허용합니다.');
// //                 return;
// //             }
// //             this.classList.toggle('btn-outline-primary');
// //             clickDayList.push(this.innerText);
// // }) 
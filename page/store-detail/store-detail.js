const res = {
    "businessTitle": "string",
    "city": "string",
    "holiday": "string",
    "interestState": true,
    "letitude": 0,
    "longtitude": 0,
    "neighborhood": "string",
    "phone": "string",
    "province": "string",
    "weekdayEndTime": 0,
    "weekdayStartTime": 0,
    "weekendEndTime": 0,
    "weekendStartTime": 0
  };
  const cloth  = {
    "productList": [
      {
        "category": "string",
        "interest": true,
        "mainImagePath": "string",
        "price": 0,
        "productId": "string",
        "size": "string",
        "title": "string"
      },
  {
        "category": "string",
        "interest": true,
        "mainImagePath": "string",
        "price": 0,
        "productId": "string",
        "size": "string",
        "title": "string"
      },
  {
        "category": "string",
        "interest": true,
        "mainImagePath": "string",
        "price": 0,
        "productId": "string",
        "size": "string",
        "title": "string"
      }
    ],
    "totalCount": 0
  }
const sort = {
    "row-price" : "string",
    "high-price" : "string",
    "new": "string", 
    "like":true
}

let weekdayStr = `평일 영업시간:${res["weekdayStartTime"]}~${res["weekdayEndTime"]}`;
let addressStr = `주소:${res["province"]} ${res["city"]} ${res["neighborhood"]}`;
let weekendDayStr = `주말 영업시간:${res["weekendStartTime"]}~${res["weekendEndTime"]}`;
let interestStateStr =`좋아요: ${res["interestState"]}`;  
let businessTitleStr = `${res["businessTitle"]}`;
let holidayStr = `휴일:${res["holiday"]}`;
let phoneStr = `연락처: ${res["phone"]}`;
let sizeStr = `사이즈: ${cloth["size"]}`;
let priceStr = `가격: ${cloth["price"]}`; 
let titleStr = `${cloth["title"]}`;


let $holiday = document.getElementById("holiday");
let $phone = document.getElementById("phone");
let $businessTitle = document.getElementById("businessTitle"); 
let $address = document.getElementById("address");
let $weekday = document.getElementById("weekday");
let $weekendDay = document.getElementById("weekendDay");
let $interestState = document.getElementById("interestState");
let $size = document.getElementById("size");
let $price = document.getElementById("price"); 
let $title = document.getElementById("title");
let $clothContainer = document.getElementById("clothContainer"); 

$businessTitle.innerText = businessTitleStr;
$address.innerText = addressStr;
$weekday.innerText = weekdayStr;
$weekendDay.innerText = weekendDayStr;
$interestState.innerText = interestStateStr;
$phone.innerText = phoneStr; 
$holiday.innerText = holidayStr;

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
$btnPants.addEventListener("click",btnPants);
$btnshoose.addEventListener("click",btnshoose);
$btnman.addEventListener("click",btnman);
$btnwoman.addEventListener("click",btnwoman);
$btnCloth.addEventListener("click",btnCloth);

for(let i = 0; i<cloth;i++){
    let innerHTML = '';
    innerHTML += ` <div class="col-lg-3 col-md-4 col-sm-6 clo-card shirts man">
    <div class="clo " id="shirt">
        <div class="center">
            <div class="clonths-img-box">
                <img class="img" src="../../assets/img/portfolio/옷 사진4.png " />
            </div>
        </div>
        <br>
        <br>
        <div class="contents-text">
            <div>${cloth["title"]}</div>
            <div>${cloth["size"]}</div>
            <div class="f price">
                ${cloth["price"]}
                <button type="button" class="btn btn-outline-primary">♥</button>
            </div>
            
        </div>
    </div>
</div>`;
    $clothContainer.innerHTML = $clothContainer.innerHTML+innerHTML; 
}



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
async function registerMember(email, password) {
    //body양식
    await axios
      .post("http://10.202.36.60:8081/api/v1/member", {
        //데이터인자
        email: email,
        password: password,
      })
      .then(function (response) {
        alert("회원가입 완료");
        accessToken(email, password);
        addAddress(email);
      })
      .catch(function (error) {
        alert(error.response["data"]["msg"]);
      });
  }
  
  async function accessToken(email, password) {
    const params = new URLSearchParams({
      email: email,
      password: password,
    }).toString();
    //쿼리
    await axios
      .post("http://10.202.36.60:8081/oauth/token?" + params)
      .then(function (res) {
        const accessToken = res["data"]["accessToken"];
        const refreshToken = res["data"]["refreshToken"];
  
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .catch(function (res) {});
  }
  
  //header
  async function addAddress(email) {
    if (inputAddressLocation != null) {
      let config = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      await axios.put(
        "http://10.202.36.60:8081/api/v1/member/address",
        inputAddressLocation,
        config
      );
    }
  }
//   await axios.post('http://10.202.36.60:8081/oauth/token?' + params)
//   .then(function(res){
//     const itemInfos = res["data"]["item"];
//     let innerString = '';
//     for(let i=0;i<itemInfos.length;i++){
//       innerString += `<div class="col-lg-3 col-md-4 col-sm-6 clo-card shirts woman">
//       <div class="clo " id="shirt">
//           <div class="center">
//               <div class="clonths-img-box">
//                   <img class="img" src="${itemInfos.img[i]}" />
//               </div>
//           </div>
//           <br>
//           <br>
//           <div class="contents-text">
//               <div>${itemInfos.item.name[i]}</div>
//               <div>${itemInfos.item.name[i]},${itemInfos.item.name[i]},${itemInfos.item.name[i]}</div>
//               <div class="price">${itemInfos.item.price[i]}</div>
//           </div>
//       </div>
//   </div>`;
//     }
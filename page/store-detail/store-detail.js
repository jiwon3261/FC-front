const STORE_DETAIL_URL = "http://10.202.36.92:8081/api/v1/store/";
const PRODUCT_LIST_URL = "http://10.202.36.92:8081/api/v1/product/";

const urlParams = new URLSearchParams(window.location.search);
const targetStore = urlParams.get('store');
if (targetStore === null) {
  location.href = '../../page/main/main.html';
}

getStoreDetail();
getProductList();
async function getProductList() {
  await axios.get(PRODUCT_LIST_URL + targetStore + "/product?page=0&size=12").then(res => {
    const cloth = res['data'];
    // console.log(cloth);
    for (let i = 0; i < cloth.productList.length; i++) {
      let innerHTML = '';
      // console.log("http://10.202.36.92:8081/" + cloth['productList'][i]['mainImagePath'])
      innerHTML += ` 
          <div class="col-lg-3 col-md-4 col-sm-6 clo-card shirt${cloth.productList[i]["category"]}>
          <div class="clo " id="shirt">
              <div class="center">
                  <div class="clonths-img-box">
                      <img class="img" src="http://10.202.36.92:8081/${cloth.productList[i]["mainImagePath"]}" />
                  </div>
              </div>
              <br>
              <br>
              <div class="contents-text">
                  <div>${cloth.productList[i]["title"]}</div>
                  <div>${cloth.productList[i]["size"]}</div>
                  <div class="f price">
                      ${cloth.productList[i]["price"]}
                      <div id="heart_${cloth.productList[i]["productId"]}" class ="heart-box">
                      </div>
                    </div>
                  
              </div>
          </div>
      </div>`;


      $clothContainer.innerHTML = $clothContainer.innerHTML + innerHTML;
    }
    for (let i = 0; i < cloth.productList.length; i++) {
      new LikeBtn(document.getElementById(`heart_${cloth.productList[i]['productId']}`), true, () => { alert("sdfsdfds") })
    }
  })
}

async function getStoreDetail() {
  const memberInfo = parseJwt(localStorage.getItem('accessToken'));

  axios.get(STORE_DETAIL_URL + memberInfo['sub']).then(res => {
    res = res['data'];
    let weekdayStr = `평일 영업시간:${res["weekdayStartTime"]}~${res["weekdayEndTime"]}`;
    let addressStr = `주소:${res["province"]} ${res["city"]} ${res["neighborhood"]}`;
    let weekendDayStr = `주말 영업시간:${res["weekendStartTime"]}~${res["weekendEndTime"]}`;
    let businessTitleStr = `${res["businessTitle"]}`;
    let holidayStr = `휴일:${res["holiday"]}`;
    let phoneStr = `연락처: ${res["phone"]}`;

    if (targetStore !== memberInfo['sub']) {
      let interestStateStr = `좋아요: ${res["interestState"]}`;
      $interestState.innerText = interestStateStr;
    }

    if (res["holiday"] === ',') {
      $holiday.innerHTML = '휴일 : <span class="badge badge-success">연중 무휴</span>';

    } else {
      $holiday.innerHTML = '<span class="badge badge-success">' + holidayStr + '';
    }

    $businessTitle.innerText = businessTitleStr;
    $address.innerText = addressStr;
    $weekday.innerText = weekdayStr;
    $weekendDay.innerText = weekendDayStr;
    $phone.innerText = phoneStr;
  });
}

const sort = {
  "row-price": "string",
  "high-price": "string",
  "new": "string",
  "like": true
}


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
const clo = { $shirts, $pants, $shoose, $man, $woman };

const $clothsContainer = document.getElementsByClassName('cloths-container');
const $genricBtn = document.getElementsByClassName('genric-btn');
const $galleryItem = document.getElementsByClassName('gallery-item');
$btnPants.addEventListener("click", btnPants);
$btnshoose.addEventListener("click", btnshoose);
$btnman.addEventListener("click", btnman);
$btnwoman.addEventListener("click", btnwoman);
$btnCloth.addEventListener("click", btnCloth);

// alert('sdsdf')
// console.log(document.getElementById('heart_string1'))




// 가격 구분 함수
function btnCloth() {
  Allhidden();
  ShowShirt();
}
function btnPants() {
  Allhidden();
  ShowPants();
}
function btnshoose() {
  Allhidden();
  ShowShoose();
}
function btnman() {
  Allhidden();
  ShowMan();
}
function btnwoman() {
  Allhidden();
  ShowWoman();
}
function Allhidden() {
  for (let i = 0; i < $clo.length; i++) {
    $clo[i].classList.add("clo-hidden");
  }
}

function ShowShirt() {
  for (let i = 0; i < $shirts.length; i++) {
    $shirts[i].classList.remove("clo-hidden");
  }
}
function ShowPants() {
  for (let i = 0; i < $pants.length; i++) {
    $pants[i].classList.remove("clo-hidden");
  }
}
function ShowShoose() {
  for (let i = 0; i < $shoose.length; i++) {
    $shoose[i].classList.remove("clo-hidden");
  }
}
function ShowMan() {
  for (let i = 0; i < $man.length; i++) {
    $man[i].classList.remove("clo-hidden");
  }
}
function ShowWoman() {
  for (let i = 0; i < $woman.length; i++) {
    $woman[i].classList.remove("clo-hidden");
  }
}

function parseJwt(token) {
  try {
    const base64HeaderUrl = token.split(".")[0];
    const base64Header = base64HeaderUrl.replace("-", "+").replace("_", "/");
    const headerData = JSON.parse(window.atob(base64Header));

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;

    return dataJWT;
  } catch (err) {
    return false;
  }
}
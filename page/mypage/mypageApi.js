const MEMBER_ADDRESS_URL = "http://10.202.48.54:8081/api/v1/member/address";
const MEMBER_STORE_INTEREST_STORE_URL =
  "http://10.202.48.54:8081/api/v1/member/interest-store";
const MEMBER_ITEM_INTEREST_ITEM_URL =
  "http://10.202.48.54:8081/api/v1/member/interest-product";

console.log(localStorage.getItem("accessToken"));

const addAddressBtn = document.getElementById("addAddressBtn");

const memberInfo = parseJwt(localStorage.getItem("accessToken"));
document.getElementById("email").innerText = memberInfo["sub"];

getMyAddress();
getInterestStore();
getInterestItem();

// function addCookie(id) {
//   var items = getCookie("productItems"); // 이미 저장된 값을 쿠키에서 가져오기
//   var maxItemNum = 5; // 최대 저장 가능한 아이템개수
//   var expire = 7; // 쿠키값을 저장할 기간
//   if (items) {
//     var itemArray = items.split(",");
//     if (itemArray.indexOf(id) != -1) {
//       // 이미 존재하는 경우 종료
//       console.log("Already exists.");
//     } else {
//       // 새로운 값 저장 및 최대 개수 유지하기
//       itemArray.unshift(id);
//       if (itemArray.length > maxItemNum) itemArray.length = 5;
//       items = itemArray.join(",");
//       setCookie("productItems", items, expire);
//     }
//   } else {
//     // 신규 id값 저장하기
//     setCookie("productItems", id, expire);
//   }
// }
// setCookie("myHobby", "game", "3");
// function setCookie(cookie_name, value, days) {
//   var exdate = new Date();
//   exdate.setDate(exdate.getDate() + days);
//   // 설정 일수만큼 현재시간에 만료값으로 지정

//   var cookie_value =
//     escape(value) + (days == null ? "" : "; expires=" + exdate.toUTCString());
//   document.cookie = cookie_name + "=" + cookie_value;
// }

// function getCookie(cookie_name) {
//   var x, y;
//   var val = document.cookie.split(";");

//   for (var i = 0; i < val.length; i++) {
//     x = val[i].substr(0, val[i].indexOf("="));
//     y = val[i].substr(val[i].indexOf("=") + 1);
//     x = x.replace(/^\s+|\s+$/g, ""); // 앞과 뒤의 공백 제거하기
//     if (x == cookie_name) {
//       return unescape(y); // unescape로 디코딩 후 값 리턴
//     }
//   }
// }
// var recentlyitem = document.getElementById()
async function getInterestStore() {
  let config = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  await axios.get(MEMBER_STORE_INTEREST_STORE_URL, config).then((res) => {
    const data = res["data"];
    let innerHTML = document.getElementById("interestStore").innerHTML;
    for (let i = 0; i < data["interestStoreList"].length; i++) {
      innerHTML += `<tr>
      <th scope="row" class="shop-img-th"><a href="#"><img src="http://10.202.48.54:8081/${data["interestStoreList"][i]["mainImage"]}" class="img-shop" alt="샘플1"></a></th>
      <td class="table-padding-top"><p><a href="#">${data["interestStoreList"][i]["businessName"]}</a></p>`;
      const tags = data["interestStoreList"][i]["tags"].split(",");
      for (let j = 0; j < tags.length; j++) {
        innerHTML += `<span>#${tags[j]} </span>`;
      }
      innerHTML +=
        `</p><p><span>${data["interestStoreList"][i]["province"]} ${data["interestStoreList"][i]["city"]} ${data["interestStoreList"][i]["neighborhood"]}<span></p></td>
      <td class="table-padding-top">
          <input id="heart` +
        i +
        10000 +
        `" type="checkbox" />
          <label for="heart` +
        i +
        10000 +
        `" class="label-shop">♥</label>
      </td>
    </tr>`;
    }
    document.getElementById("interestStore").innerHTML = innerHTML;
  });
}
addCookie("111");
addCookie();

async function getMyAddress() {
  let config = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  await axios.get(MEMBER_ADDRESS_URL, config).then((res) => {
    if (res["data"]["city"] === null) {
      document.getElementById("userAdd").innerText =
        "주소가 등록되어있지 않습니다.";
    } else {
      document.getElementById("userAdd").innerText =
        res["data"]["province"] +
        " " +
        res["data"]["city"] +
        " " +
        res["data"]["neighborhood"];
    }
  });
}

async function getInterestItem() {
  let config = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  await axios.get(MEMBER_ITEM_INTEREST_ITEM_URL, config).then((res) => {
    const data = res["data"];
    console.log(data);
    let innerHTML = document.getElementById("interestItem").innerHTML;
    let innerHTML_list = document.getElementById("tbody-item").innerHTML;
    console.log(innerHTML_list);
    for (let i = 0; i < data["interestProductList"].length; i++) {
      innerHTML +=
        `<div class="card">
      <img src="http://10.202.48.54:8081/${data["interestProductList"][i]["mainImage"]}" class="card-img-top" alt="샘플1">
      <div class="card-body">
          <a href="#" class="card-text">${data["interestProductList"][i]["title"]} 
              <input id="heart` +
        i +
        1000 +
        `" type="checkbox" />
              <label for="heart` +
        i +
        1000 +
        `">♥</label></a>
          <a href="#" class="card-text">${data["interestProductList"][i]["storeName"]}</a>
          <p class="card-text">${data["interestProductList"][i]["price"]} <strong>won</strong></p>
          `;
      const tags = data["interestProductList"][i]["tags"].split(",");
      for (let j = 0; j < tags.length; j++) {
        innerHTML += `<span>#${tags[j]} </span>`;
      }
      innerHTML += `</div></div>`;
    }

    for (let i = 0; i < data["interestProductList"].length; i++) {
      innerHTML_list += `<tr>
      <th scope="row">`;
      innerHTML_list +=
        i +
        1 +
        `</th>
      <td><img src="http://10.202.48.54:8081/${data["interestProductList"][i]["mainImage"]}" class="img-thumbnail" alt="샘플1"></td>
      <td class="table-padding"><a href="#">${data["interestProductList"][i]["title"]}</a></td>
      <td class="table-padding"><a href="#">${data["interestProductList"][i]["storeName"]}</a></td>
      <td class="table-padding"><p>${data["interestProductList"][i]["price"]} <strong>won</strong></p></td>
      <td class="table-padding">`;
      const tags = data["interestProductList"][i]["tags"].split(",");
      for (let j = 0; j < tags.length; j++) {
        innerHTML_list += `<span class="tag-padding">#${tags[j]} </span>`;
      }
      innerHTML_list +=
        `</td>
      <td class="table-padding">
          <input id="heart` +
        i +
        100 +
        `" type="checkbox" />
          <label for="heart` +
        i +
        100 +
        `" class="label-item">♥</label>
      </td>
    </tr>`;
    }
    console.log(innerHTML);
    document.getElementById("interestItem").innerHTML = innerHTML;
    document.getElementById("tbody-item").innerHTML = innerHTML_list;
  });
}

async function getMyAddress() {
  let config = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  await axios.get(MEMBER_ADDRESS_URL, config).then((res) => {
    if (res["data"]["city"] === null) {
      document.getElementById("userAdd").innerText =
        "주소가 등록되어있지 않습니다.";
    } else {
      document.getElementById("userAdd").innerText =
        res["data"]["province"] +
        " " +
        res["data"]["city"] +
        " " +
        res["data"]["neighborhood"];
    }
  });
}

addAddressBtn.addEventListener("click", () => {
  new daum.Postcode({
    oncomplete: function (data) {
      let config = {
        headers: {
          Authorization: "KakaoAK d40c82c42db0892f356fd71c6c36c7a0",
        },
      };
      axios
        .get(
          "https://dapi.kakao.com/v2/local/search/address.json?query=" +
            data["address"],
          config
        )
        .then((res) => {
          const x = res["data"]["documents"][0]["address"]["x"];
          const y = res["data"]["documents"][0]["address"]["y"];
          let config = {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          };
          axios
            .put(
              "http://10.202.48.54:8081/api/v1/member/address",
              {
                letitude: y,
                longtitude: x,
              },
              config
            )
            .then((res) => {
              document.getElementById("userAdd").innerText =
                res["data"]["address"]["province"] +
                " " +
                res["data"]["address"]["city"] +
                " " +
                res["data"]["address"]["neighborhood"];
            });
        });
    },
  }).open();
});

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

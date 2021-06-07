const MEMBER_ADDRESS_URL = "http://192.168.0.18:8081/api/v1/member/address";
const MEMBER_STORE_INTEREST_STORE_URL =
  "http://192.168.0.18:8081/api/v1/member/interest-store";
const MEMBER_ITEM_INTEREST_ITEM_URL =
  "http://192.168.0.18:8081/api/v1/member/interest-product";

console.log(localStorage.getItem("accessToken"));

const addAddressBtn = document.getElementById("addAddressBtn");

const memberInfo = parseJwt(localStorage.getItem("accessToken"));
document.getElementById("email").innerText = memberInfo["sub"];

getMyAddress();
getInterestStore();
getInterestItem();
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
      <th scope="row" class="shop-img-th"><a href="#"><img src="http://192.168.0.18:8081/${data["interestStoreList"][i]["mainImage"]}" class="img-shop" alt="샘플1"></a></th>
      <td class="table-padding-top"><p><a href="#">${data["interestStoreList"][i]["businessName"]}</a></p>`;
      const tags = data["interestStoreList"][i]["tags"].split(",");
      for (let j = 0; j < tags.length; j++) {
        innerHTML += `<span>#${tags[j]} </span>`;
      }
      innerHTML += `</p><p><span>${data["interestStoreList"][i]["province"]} ${data["interestStoreList"][i]["city"]} ${data["interestStoreList"][i]["neighborhood"]}<span></p></td>
      <td class="table-padding-top">
          <input id="heart25" type="checkbox" />
          <label for="heart25" class="label-shop">♥</label>
      </td>
    </tr>`;
    }
    document.getElementById("interestStore").innerHTML = innerHTML;
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
    for (let i = 0; i < data["interestProductList"].length; i++) {
      innerHTML += `<div class="card">
      <img src="http://192.168.0.18:8081/${data["interestProductList"][i]["mainImage"]}" class="card-img-top" alt="샘플1">
      <div class="card-body">
          <a href="#" class="card-text">${data["interestProductList"][i]["title"]} 
              <input id="heart" type="checkbox" />
              <label for="heart">♥</label></a>
          <a href="#" class="card-text">${data["interestProductList"][i]["storeName"]}</a>
          <p class="card-text">${data["interestProductList"][i]["price"]} <strong>won</strong></p>
          `;
      const tags = data["interestProductList"][i]["tags"].split(",");
      for (let j = 0; j < tags.length; j++) {
        innerHTML += `<span>#${tags[j]} </span>`;
      }
      innerHTML += `</div></div>`;
    }
    console.log(innerHTML);
    document.getElementById("interestItem").innerHTML = innerHTML;
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
              "http://192.168.0.18:8081/api/v1/member/address",
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

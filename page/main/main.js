const MEMBER_ADDRESS_URL = "http://10.202.48.54:8081/api/v1/member/address";
const STORE_LIST_URL = "http://10.202.48.54:8081/api/v1/store";
const REFRESH_TOKEN_URL = "http://10.202.48.54:8081/oauth/refresh-token";

let selectFlag = "GPS";

let myAddress = null;
let inputAddressLocation = null;

let map = null;

document.getElementById("myRange").addEventListener("change", (e) => {
  if (selectFlag === "GPS") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        lati = pos.coords.latitude; // 위도
        lont = pos.coords.longitude; // 경도

        mapOption = {
          center: new kakao.maps.LatLng(lati, lont), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        };
        var mapContainer = document.getElementById("store-map");

        map = new kakao.maps.Map(mapContainer, mapOption);
        getStores({
          page: 0,
          size: 100,
          letitude: lati,
          longtitude: lont,
          distanceCoordinateDifference: e.target.value,
        });
      });
    }
  }
});

document.getElementById("myAddressSearchBtn").addEventListener("click", () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken !== null && accessToken !== "") {
    let config = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    axios
      .get(MEMBER_ADDRESS_URL, config)
      .then((res) => {
        myAddress = res["data"];
        if (myAddress["city"] === null) {
          MessageBox.show(
            "현재 주소지가 등록되어있지 않습니다.",
            "danger",
            3000
          );
        } else {
          mapOption = {
            center: new kakao.maps.LatLng(
              myAddress["letitude"],
              myAddress["longtitude"]
            ), // 지도의 중심좌표
            level: 4, // 지도의 확대 레벨
          };

          var moveLatLon = new kakao.maps.LatLng(
            myAddress["letitude"],
            myAddress["longtitude"]
          );

          // 지도 중심을 이동 시킵니다
          map.panTo(moveLatLon);

          getStores({
            page: 0,
            size: 100,
            letitude: myAddress["letitude"],
            longtitude: myAddress["longtitude"],
            distanceCoordinateDifference: 10,
          });
        }
      })
      .catch((error) => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken !== null && refreshToken !== "") {
          const memberEmail = parseJwt(refreshToken)["sub"];
          const params = new URLSearchParams({
            email: memberEmail,
            refreshToken: refreshToken,
          }).toString();
        } else {
          MessageBox.show("로그인이 필요한 기능입니다.", "danger", 3000);
        }
      });
  } else {
    MessageBox.show("로그인이 필요한 기능입니다.", "danger", 3000);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let lati = 0; // 위도
  let lont = 0;

  const dialogCloseBtn = document.getElementById("dialog-close");
  const mobileToggle = document.getElementById("mobile-store-list");
  const storeList = document.getElementById("storeList");
  const addressChangeBtn = document.getElementById("addressChangeBtn");
  const addressBarBottom = document.getElementById("addressBarBottom");
  // 지도를 표시할 div
  var mapContainer = document.getElementById("store-map");
  //주소->좌표 변환객체
  var geocoder = new kakao.maps.services.Geocoder();
  var imageSrc = "../../assets/img/marker-2.png";
  let imageSize = new kakao.maps.Size(45, 61); // 마커이미지의 크기입니다
  let imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const addEventHandler = (elem, type, callback) => {
    elem.addEventListener(type, callback);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      lati = pos.coords.latitude; // 위도
      lont = pos.coords.longitude; // 경도

      mapOption = {
        center: new kakao.maps.LatLng(lati, lont), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };
      map = new kakao.maps.Map(mapContainer, mapOption);
      getStores({
        page: 0,
        size: 100,
        letitude: lati,
        longtitude: lont,
        distanceCoordinateDifference: 10,
      });
    });
  } else {
  }

  function createMap(data) {
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
        inputAddressLocation = {
          letitude: y,
          longtitude: x,
        };
        mapOption = {
          center: new kakao.maps.LatLng(y, x), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        };
        map = new kakao.maps.Map(mapContainer, mapOption);
        getStores({
          page: 0,
          size: 100,
          letitude: y,
          longtitude: x,
          distanceCoordinateDifference: 10,
        });
      });
  }

  const addressChangeHandler = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        createMap(data);
        addressBarBottom.innerText = data["address"];
      },
    }).open();
  };

  const createSlider = () => {
    //부트스트랩 슬라이더
    var slider = document.getElementById("myRange");
    var output = document.getElementById("distance-input");
    output.innerText = `${slider.value}km`;

    slider.oninput = function () {
      output.innerHTML = `${this.value}km`;
    };
  };

  const storeListEventHandler = () => {
    dialogCloseBtn.addEventListener("click", () => {
      document.getElementById("detail-dialog").classList.remove("on");
    });

    storeList.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("like-btn")) {
        target.style.backgroundColor = "pink";
        return;
      }
      while (!target.classList.contains("store-card-container")) {
        if (target === storeList) {
          target = null;
          return;
        }
        target = target.parentNode;
      }
      const owner = target.id.split(",")[1];

      axios.get(STORE_LIST_URL + "/" + owner).then((res) => {
        const data = res["data"];
        document.getElementById("storeTitle").innerText = data["businessTitle"];
        document.getElementById("storeAddress").innerText =
          data["province"] + " " + data["city"] + " " + data["neighborhood"];

        data["holiday"].split(",").map((holiday) => {
          if (holiday !== "") {
            document
              .getElementById("holiday_" + holiday)
              .classList.add("store-off");
          }
        });

        document.getElementById("storePhone").innerText = data["phone"];
        document.getElementById("weekdayStart").innerText =
          data["weekdayStartTime"];
        document.getElementById("weekdayEnd").innerText =
          data["weekdayEndTime"];
        document.getElementById("weekendStart").innerText =
          data["weekendStartTime"];
        document.getElementById("weekendEnd").innerText =
          data["weekendEndTime"];

        document
          .getElementById("redirectStoreDetailBtn")
          .addEventListener("click", () => {
            location.href =
              "../../page/store-detail/store-detail.html?store=" + owner;
          });

        document.getElementById("detail-dialog").classList.add("on");

        var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
        var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
        var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

        var position = new kakao.maps.LatLng(
          data["letitude"],
          data["longtitude"]
        );

        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        roadviewClient.getNearestPanoId(position, 50, function (panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });
      });
    });
  };

  const mobileToggleHandler = () => {
    mobileToggle.addEventListener("click", () => {
      document.body.classList.toggle("mobile-toggle");
    });
  };

  (function init() {
    createSlider();
    storeListEventHandler();
    mobileToggleHandler();
  })();

  addEventHandler(addressChangeBtn, "click", addressChangeHandler);
  addEventHandler(addressBarBottom, "click", addressChangeHandler);
});

function getStores(data) {
  const params = new URLSearchParams({
    page: data["page"],
    size: data["size"],
    letitude: data["letitude"],
    longtitude: data["longtitude"],
    distanceCoordinateDifference: data["distanceCoordinateDifference"],
  }).toString();

  axios.get(STORE_LIST_URL + "?" + params).then((res) => {
    const positions = [];
    let innerHTML = ``;
    res["data"]["storeLists"].map((store) => {
      positions.push({
        title: store["businessTitle"],
        latlng: new kakao.maps.LatLng(store["letitude"], store["longtitude"]),
      });
      innerHTML += `
          <div onclick="moveToMap(${store["letitude"]},${store["longtitude"]})" id="storeList,${store["owner"]}" class="store-card-container">
              <div class="store-info-text">
                  <div>
                      <a href="#" class="store-name">${store["businessTitle"]}</a>
                      <div class="store-detail-info">`;
      store["storeTags"].split(",").map((tag) => {
        innerHTML += `<div class="s-d-tag">#${tag}</div>`;
      });
      innerHTML += `</div>
                  </div>
                  <div class="detail-bottom">
                      <div class="like-btn-container">
                          <button id="like1" class="like-btn"><i class="fas fa-heart"></i></button>
                          <div class="bottom-detail">
                              <div class="like-count">${
                                store["interestCnt"]
                              } &nbsp;|&nbsp; 약 ${store[
        "distanceCoordinate"
      ].toFixed(1)}km떨어짐</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="store-info-img">
              ${
                store["imagePath"] === null
                  ? `
                  <div class="img-area" style="background-image: url('http://10.202.48.54:8081/default_image.PNG');">
                  </div>
              `
                  : `
                  <div class="img-area" style="background-image: url('http://10.202.48.54:8081/${store["imagePath"]}');">
                  </div>
              `
              }
              </div>
          </div>
      `;
    });
    var imageSrc = "../../assets/img/marker-2.png";

    positions.map((position) => {
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng, // 마커를 표시할 위치
        title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    });
    document.getElementById("storeList").innerHTML = innerHTML;
  });
}

function moveToMap(letitude, longtitude) {
  var moveLatLon = new kakao.maps.LatLng(letitude, longtitude);
  map.panTo(moveLatLon);
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

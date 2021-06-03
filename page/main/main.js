window.addEventListener("DOMContentLoaded", () => {
  let lati = 0;   // 위도
  let lont = 0; 

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition (function(pos) {
        lati = pos.coords.latitude;     // 위도
        lont = pos.coords.longitude; // 경도
    });
} else {
    alert("이 브라우저에서는 위치정보가 지원되지 않습니다.")
}

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
 

  const createMap = (address) => {
    mapOption = {
      center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    geocoder.addressSearch(
      address,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage,
          });

          // 지도 셋팅&마커표기
          marker.setMap(map);
          map.setCenter(coords);
        }
      }
    );
  };

  const addressChangeHandler = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        createMap(data['address'])
        addressBarBottom.innerText =data['address'];
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

      document.getElementById("detail-dialog").classList.add("on");

      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      var position = new kakao.maps.LatLng(33.450701, 126.570667);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    });
  };

  const mobileToggleHandler = () => {
    mobileToggle.addEventListener("click", () => {
      document.body.classList.toggle("mobile-toggle");
    });
  };

  (function init() {
    createMap();
    createSlider();
    storeListEventHandler();
    mobileToggleHandler();
  })();

  addEventHandler(addressChangeBtn, "click", addressChangeHandler);
  addEventHandler(addressBarBottom, "click", addressChangeHandler);
});

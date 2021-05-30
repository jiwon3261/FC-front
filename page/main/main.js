window.addEventListener("DOMContentLoaded", () => {
  var mapContainer = document.getElementById("store-map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  var imageSrc = "../../assets/img/marker-2.png", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(45, 61), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    ),
    markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 커스텀 오버레이가 표시될 위치입니다
  var position = new kakao.maps.LatLng(37.54699, 127.09598);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: position,
    yAnchor: 1,
  });

  //부트스트랩 슬라이더
  var slider = document.getElementById("myRange");
  var output = document.getElementById("distance-input");
  output.innerText = `${slider.value}km`;

  slider.oninput = function () {
    output.innerHTML = `${this.value}km`;
  };
  //sotreList Event
  const dialogCloseBtn = document.getElementById('dialog-close');
  dialogCloseBtn.addEventListener('click',()=>{
    document.getElementById('detail-dialog').classList.remove('on')
  })
  const storeList = document.getElementById("storeList");
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
    
    document.getElementById('detail-dialog').classList.add('on')

    var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    var position = new kakao.maps.LatLng(33.450701, 126.570667);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
  });
  //mobile-list-toggle
  const mobileToggle = document.getElementById("mobile-store-list");
  mobileToggle.addEventListener("click", () => {
    document.body.classList.toggle("mobile-toggle");

    
  });
});

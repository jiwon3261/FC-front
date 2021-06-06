const addAddressBtn = document.getElementById("addAddressBtn");
let inputAddressLocation = null;

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
            data["jibunAddress"],
          config
        )
        .then((res) => {
          const x = res["data"]["documents"][0]["address"]["x"];
          const y = res["data"]["documents"][0]["address"]["y"];
          inputAddressLocation = {
            letitude: y,
            longtitude: x,
          };
    //여기에서 서버요청하래
        });
    },
  }).open();
});

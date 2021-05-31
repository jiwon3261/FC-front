const registerMemberBtn = document.getElementById("registerMemberBtn");
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
      document.getElementById("address").value = data["jibunAddress"];
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
        });
    },
  }).open();
});

registerMemberBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordChk = document.getElementById("passwordChk").value.trim();

  if (InputValidator.isEmpty(email)) {
    alert("1");
    return;
  }

  if (InputValidator.isEmpty(password)) {
    alert("2");
    return;
  }

  if (InputValidator.isEmpty(passwordChk)) {
    alert("3");
    return;
  }

  if (!InputValidator.equal(password, passwordChk)) {
    alert(4);
    return;
  }

  registerMember(email, password);
});

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

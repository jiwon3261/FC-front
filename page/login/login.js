const ACCESS_TOKEN_URL = "http://192.168.123.102:8081/oauth/token";

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (InputValidator.isEmpty(email)) {
    alert();
    return;
  }

  if (InputValidator.isEmpty(password)) {
    alert();
    return;
  }

  const params = new URLSearchParams({
    email: email,
    password: password,
  }).toString();

  axios
    .post(ACCESS_TOKEN_URL + "?" + params)
    .then(function (response) {
      const accessToken = response["data"]["accessToken"];
      const refreshToken = response["data"]["refreshToken"];

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const memberInfo =parseJwt(accessToken);
      if(memberInfo['role'][0] === 'ROLE_SELLER'){
        location.href = '../../page/store-detail/store-detail.html';
      }else{
        location.href = '../../page/main/main.html';
      }
    })
    .catch(function (error) {
      console.log(error)
      MessageBox.show(error.response["data"]["msg"],'danger',3000);
    });
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

// const value =
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3b2R5ZDIwMkBuYXZlci5jb20iLCJyb2xlIjpbIlJPTEVfbnVsbCJdLCJpYXQiOjE2MjIzODExMjYsImV4cCI6MTYyMjM4MjkyNn0.SNX0BEOzNvjFi2_IV3xHLgJv7U9j2iKkpgyaRtWIoYI";
// console.log(parseJwt(value));

// function parseJwt(token) {
//     try {
//       const base64HeaderUrl = token.split('.')[0];
//       const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
//       const headerData = JSON.parse(window.atob(base64Header));

//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace('-', '+').replace('_', '/');
//       const dataJWT = JSON.parse(window.atob(base64));
//       dataJWT.header = headerData;
  
//       return dataJWT;
//     } catch (err) {
//       return false;
//     }
//   }

const ACCESS_TOKEN_URL = "http://localhost:8081/oauth/token";

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

      location.href="../../page/index/index.html";
    })
    .catch(function (error) {
      MessageBox.show(error.response["data"]["msg"],'danger',3000);
    });
});

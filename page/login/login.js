const ACCESS_TOKEN_URL = "http://192.168.0.18:8081/oauth/token";

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
      console.log(error)
      MessageBox.show(error.response["data"]["msg"],'danger',3000);
    });
});

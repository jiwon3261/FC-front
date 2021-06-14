const MEMBER_URL = "http://10.202.48.54:8081/api/v1/member";

const registerMemberBtn = document.getElementById("registerMemberBtn");
let inputAddressLocation = null;

registerMemberBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordChk = document.getElementById("passwordChk").value.trim();

  if (InputValidator.isEmpty(email)) {
    MessageBox.show("이메일을 입력해주세요", "danger", 3000);
    return;
  }

  if (InputValidator.isEmpty(password)) {
    MessageBox.show("비밀번호를 입력해주세요", "danger", 3000);
    return;
  }

  if (InputValidator.isEmpty(passwordChk)) {
    MessageBox.show("비밀번호 확인란을 입력해주세요.", "danger", 3000);
    return;
  }

  if (!InputValidator.equal(password, passwordChk)) {
    MessageBox.show(
      "입력하신 비밀번호와 비밀번호 확인란이 일치하지 않습니다.",
      "danger",
      3000
    );
    return;
  }

  registerMember(email, password);
});

async function registerMember(email, password) {
  //body양식
  await axios
    .post(MEMBER_URL, {
      //데이터인자
      email: email,
      password: password,
    })
    .then(function (response) {
      location.href = "../login/login.html";
    })
    .catch(function (error) {
      MessageBox.show(error.response["data"]["msg"], "danger", 3000);
    });
}

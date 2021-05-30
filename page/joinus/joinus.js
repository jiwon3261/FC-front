const registerMemberBtn = document.getElementById("registerMemberBtn");

registerMemberBtn.addEventListener('click',()=>{
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordChk = document.getElementById("passwordChk").value.trim();

  if(InputValidator.isEmpty(email)){
    alert('1');
    return;
  }
  
  if(InputValidator.isEmpty(password)){
    alert('2');
    return;
  }

  if(InputValidator.isEmpty(passwordChk)){
    alert('3');
    return;
  }
  
  if(!InputValidator.equal(password, passwordChk)){
    alert('4');
    return;
  }

  axios.post('http://localhost:8081/api/v1/member',{
    email : email,
    password : password
  },)
    .then(function(response) {
      alert('회원가입 완료');
    })
    .catch(function(error) {
      alert(error.response['data']['msg']);
    });
});


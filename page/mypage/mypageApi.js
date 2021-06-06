window.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem('accessToken')){
        alert("로그인상태");
    }
    else{
        alert("끊김");
    }
    
const email = document.getElementById("email").innerHTML; 
const res = {
    "email": "string",
    "password": "string"
  }
const user = {
    "address": {
      "city": "string",
      "letitude": 0,
      "longtitude": 0,
      "neighborhood": "string",
      "province": "string"
    },
    "createDateTime": "2021-06-06T07:25:46.842Z",
    "email": {
      "value": "string"
    },
    "expectedVersion": 0,
    "identifier": {
      "value": "string"
    },
    "interestProducts": {
      "products": [
        {
          "id": "string"
        }
      ]
    },
    "interestStores": {
      "stores": [
        {
          "email": "string"
        }
      ]
    },
    "password": {
      "value": "string"
    },
    "rule": "BUYER",
    "state": "CREATE",
    "uncommittedChanges": [
      {}
    ]
  }
  
  let userInfo =`${res["email"]}`; 
  let userAdress =`${user["city"]}`; 

  let $email = document.getElementById("email");
  let $userAdd = document.getElementById("userAdd");
  $email.innerHTML = userInfo;
  $userAdd.innerHTML = userAdress;
  console.log($email);
  console.log($userAdd);

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
})
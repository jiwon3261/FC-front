const clickTagList = [];

const TAGS_URL = "http://192.168.0.18:8081/api/v1/store/tags";
const REGISTER_STORE_URL = "http://192.168.0.18:8081/api/v1/store";

const registerStoreBtn = document.getElementById('registerStoreBtn');
const addAddressBtn = document.getElementById("addAddressBtn");

let inputAddressLocation = null;

registerStoreBtn.addEventListener('click',()=>{
    let config = {
        headers: {
            'Authorization': localStorage.getItem('accessToken'),
        }
    }
    
    axios.post(REGISTER_STORE_URL,{
        "address": {
          "letitude": inputAddressLocation['letitude'],
          "longtitude": inputAddressLocation['longtitude']
        },
        "addressDetail": document.getElementById('addressDetail').value.trim(),
        "businessName": document.getElementById('businessName').value.trim(),
        "businessNumber": document.getElementById('businessNumber').value.trim(),
        "holidays": [
        ],
        "phone": document.getElementById('phone1').value + "-" + document.getElementById('phone2').value + "-" + document.getElementById('phone3').value,
        "storeTags": [
          "태그_1"
        ],
        "weekdayEndTime": document.getElementById('weekdayEnd').value,
        "weekdayStartTime": document.getElementById('weekdayStart').value,
        "weekendEndTime": document.getElementById('weekendEnd').value,
        "weekendStartTime": document.getElementById('weekendStart').value
      },config)
    .then(function(response) {
        alert('등록 성공');
    })
    .catch(function(error) {
        alert(error.response['data']['msg']);
    });
});

getTags();

async function getTags(){
    await axios.get(TAGS_URL)
    .then(function(response) {
        let innerHTML = '';
        response['data'].map(tag=>{
            innerHTML += `<button type="button" class="btn btn-outline-primary tagButton">${tag['name']}</button>`;
        });
        document.getElementById('inputTag').innerHTML = innerHTML;
    });
    const tagButton = Array.from(document.getElementsByClassName("tagButton"));
    tagButton.map(element=>{
        element.addEventListener('click',tagClick);
    })

    function tagClick(){
        if(clickTagList.includes(this.innerText)){
            var indexOf = clickTagList.indexOf(this.innerText);
            clickTagList.splice(indexOf, 1);
            this.classList.toggle('btn-outline-primary');
            return;
        }
    
        if(clickTagList.length === 3) {
            alert('내 매장 태그는 3개까지만 허용합니다.');
            return;
        }
        this.classList.toggle('btn-outline-primary');
        clickTagList.push(this.innerText);
    }
}

addAddressBtn.addEventListener("click", () => {
  new daum.Postcode({
    oncomplete: function (data) {
      let config = {
        headers: {
          Authorization: "KakaoAK d40c82c42db0892f356fd71c6c36c7a0",
        },
      };
      document.getElementById("address").value = data["jibunAddress"];
      document.getElementById("inputAdress2").focus();
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
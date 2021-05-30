const clickTagList = [];

const TAGS_URL = "http://localhost:8081/api/v1/store/tags";
const REGISTER_STORE_URL = "http://localhost:8081/api/v1/store";

const registerStoreBtn = document.getElementById('registerStoreBtn');

registerStoreBtn.addEventListener('click',()=>{
    let config = {
        headers: {
            'Authorization': localStorage.getItem('accessToken'),
        }
    }
    axios.post(REGISTER_STORE_URL,{
        "address": {
          "letitude": 37.40612091848614,
          "longtitude": 127.1163593869371
        },
        "addressDetail": "string",
        "businessName": "string",
        "businessNumber": "1234567890",
        "holidays": [
        ],
        "phone": "010-0000-0000",
        "storeTags": [
          "태그_1"
        ],
        "weekdayEndTime": 24,
        "weekdayStartTime": 0,
        "weekendEndTime": 24,
        "weekendStartTime": 0
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

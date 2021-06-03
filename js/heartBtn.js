class LikeBtn {
    constructor(tag, state, clickFunc){
        this.state = state;
        const btn = document.createElement('button');
        btn.setAttribute('data-state', state);
        btn.innerText = "♥";
        btn.classList.add('comm-like-btn');
        this.likeBtn = btn;

        this.likeBtn.addEventListener('click',()=>{
            clickFunc();
            this.state = !this.state;
            btn.dataset.state = this.state;
        });

        tag.append(this.likeBtn);
    }
}

//페이지 개인 js에서 작업
/*
(()=>{
    // 요청을 성공했다.
    // response를 받는다.
    const response = {
        productId : '1231312',
        title : 'fdsfds',
        interestState : false
    };
    
    new LikeBtn(document.getElementById('item-like-btn'), response['interestState'],()=>{
        // axios 관심 url에 요청
    });
    
    new LikeBtn(document.getElementById('shop-like-btn'), response['interestState'],()=>{
        // axios 관심 url에 요청
    });
})();
*/

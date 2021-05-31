(()=>{
    const subImgElem = document.getElementById('subImg');
    const mginImgElem = document.getElementById('mainImg');


    subImgElem.addEventListener('click',(e)=>{
        console.log(e.target.getAttribute('src'))
        let prevMainSrc = mginImgElem.getAttribute('src');
        mginImgElem.setAttribute('src',e.target.getAttribute('src'));
        e.target.setAttribute('src',prevMainSrc);
    })

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
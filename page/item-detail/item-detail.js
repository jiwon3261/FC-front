(()=>{
    const subImgElem = document.getElementById('subImg');
    const mginImgElem = document.getElementById('mainImg');


    subImgElem.addEventListener('click',(e)=>{
        console.log(e.target.getAttribute('src'))
        let prevMainSrc = mginImgElem.getAttribute('src');
        mginImgElem.setAttribute('src',e.target.getAttribute('src'));
        e.target.setAttribute('src',prevMainSrc);
    })
})();
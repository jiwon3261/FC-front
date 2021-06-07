(() => {
  const serverURI = "http://10.202.36.92:8081";
  let nowProductId;
  let nowStoreId;

  const elemInnerText = (elemId, data) => {
    const $textContainer = document.getElementById(elemId);
    $textContainer.innerText = data;
  };
  const elemInnerHTML = (elemId, innerHtmlStr) => {
    const $htmlContainer = document.getElementById(elemId);
    $htmlContainer.innerHTML = innerHtmlStr;
  };

  const priceAddComma = (price) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return price.toString().replace(regexp, ",");
  };
  const createTagsHtml = (data) => {
    let innerHtmlStr = "";
    let tagArr = data.split(",");

    for (let i = 0; i < tagArr.length; i++) {
      innerHtmlStr += `<div class="custom-tag">
            #${tagArr[i]}
        </div>`;
    }
    return innerHtmlStr;
  };
  const createsizeHtml = (data) => {
    let innerHtmlStr = "";
    let sizeArr = data.split(",");

    for (let i = 0; i < sizeArr.length; i++) {
      innerHtmlStr += `<div class="size-badge">
            ${sizeArr[i]}
        </div>`;
    }
    return innerHtmlStr;
  };

  const createImgs = (data) => {
    const $subImgContainer = document.getElementById("subImg");
    const $mainImgElem = document.getElementById("mainImg");
    for (let i = 0; i < data.length; i++) {
      if (data[i]["type"] === "SUB") {
        //서브이미지
        let imgElem = document.createElement("img");
        imgElem.setAttribute("src", `${serverURI}/${data[i]["path"]}`);
        imgElem.setAttribute("alt", `subImage`);
        $subImgContainer.appendChild(imgElem);
      } else {
        $mainImgElem.setAttribute("src", `${serverURI}/${data[i]["path"]}`);
      }
    }
  };
  //의류정보 clothInfo
  //   (()=>{

  //   })();
  axios
    .get(`${serverURI}/api/v1/product/1`)
    .then((res) => {
      let _res = res["data"];
      console.log(_res);
      nowProductId = _res["productId"];
      elemInnerHTML("item-tag-container", createTagsHtml(_res["tags"]));

      elemInnerText("item-name-container", _res["title"]);
      elemInnerText(
        "item-price-container",
        `${priceAddComma(_res["price"])} won`
      );
      elemInnerHTML("item-size-container", createsizeHtml(_res["size"]));
      createImgs(_res["images"]);
    })
    .catch((error) => {
      console.log(error);
    });

  //뉴상품6개 storeNew6
  axios
    .get(`${serverURI}/api/v1/product/1`)
    .then((res) => {
      //   console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  //업체태그목록 storeTags
  axios
    .get(`${serverURI}/api/v1/product/1`)
    .then((res) => {
      // console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  const subImgElem = document.getElementById("subImg");
  const mginImgElem = document.getElementById("mainImg");

  subImgElem.addEventListener("click", (e) => {
    let prevMainSrc = mginImgElem.getAttribute("src");
    mginImgElem.setAttribute("src", e.target.getAttribute("src"));
    e.target.setAttribute("src", prevMainSrc);
  });

  const response = {
    productId: "1231312",
    title: "fdsfds",
    interestState: false,
  };

  new LikeBtn(
    document.getElementById("item-like-btn"),
    response["interestState"],
    () => {
      // axios 관심 url에 요청
    }
  );

  new LikeBtn(
    document.getElementById("shop-like-btn"),
    response["interestState"],
    () => {
      // axios 관심 url에 요청
    }
  );
})();

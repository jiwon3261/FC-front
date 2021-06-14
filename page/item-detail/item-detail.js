(() => {
  const serverURI = "http://10.202.36.92:8081";
  let nowProductId = 1;
  let owner;

  const redirectShop = (e) => {
    window.location.href = `../store-detail/store-detail.html?store=${owner}`;
  };

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
  (async () => {
    await axios
      .get(`${serverURI}/api/v1/product/1`)
      .then((res) => {
        let _res = res["data"];
        owner = _res["owner"];
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

    //업체 가져오기
    await axios
      .get(`${serverURI}/api/v1/store/${owner}`)
      .then((res) => {
        document.getElementById("store-name-container").innerText =
          res["data"]["businessTitle"];
        document.getElementById(
          "store-new6"
        ).innerText = `${res["data"]["businessTitle"]}의 신상품`;
      })
      .catch((error) => {
        console.log(error);
      });

    //뉴상품6개 storeNew6

    await axios
      .get(`${serverURI}/api/v1/product/${owner}/new`)
      .then((res) => {
        const new6Img = document.getElementById("store-new6-img");
        let newItemHtml = "";
        console.log(res);
        for (let i = 0; i < res["data"].length; i++) {
          newItemHtml += `
          <div class="new-item">
            <img src="${serverURI}/${res["data"][i]["mainImagePath"]}" alt="">
          </div>`;
          // console.log(res['data'][i]['category'])
        }
        new6Img.innerHTML = newItemHtml;
      })
      .catch((error) => {
        console.log(error);
      });
  })();

  const subImgElem = document.getElementById("subImg");
  const mginImgElem = document.getElementById("mainImg");
  const shopRedirectBtn = document.getElementById("shop-redirect");
  const shopRedirectAddBtn = document.getElementById("shop-redirect-add");

  shopRedirectBtn.addEventListener("click", redirectShop);
  shopRedirectAddBtn.addEventListener("click", redirectShop);

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

  console.log(localStorage.getItem("accessToken"))

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken !== null && accessToken !== "") {
    alert("로그인함");
    new LikeBtn(document.getElementById("item-like-btn"), true, () => {
      // axios 관심 url에 요청
    });
    new LikeBtn(document.getElementById("shop-like-btn"), true, () => {
      // axios 관심 url에 요청
    });
  } else {
    alert("로그인안함안함");
    new LikeBtn(document.getElementById("item-like-btn"), false, () => {
      MessageBox.show("로그인이 필요한 서비스 입니다", "danger", 2000);
      return
    });
    new LikeBtn(document.getElementById("shop-like-btn"), false, () => {
      MessageBox.show("로그인이 필요한 서비스 입니다", "danger", 2000);
    });
  }
})();

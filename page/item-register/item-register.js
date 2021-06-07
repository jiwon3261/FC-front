const PRODUCT_TAG_URL = "http://10.202.36.92:8081/api/v1/product/tags";
const PRODUCT_URL = "http://10.202.36.92:8081/api/v1/product";

const uploadFileList = [];
const selectTagList = [];

getTags();

async function getTags() {
  await axios.get(PRODUCT_TAG_URL).then((res) => {
    const tags = res["data"];
    let innerHTML = ``;
    tags.map((value) => {
      innerHTML += `<button type="button" class="btn btn-primary tagButton" style="margin-right:5px;">${value["name"]}</button>`;
    });
    document.getElementById("tags").innerHTML = innerHTML;
  });

  Array.from(document.getElementsByClassName("tagButton")).map((tag) => {
    tag.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-primary")) {
        if (selectTagList.length > 2) {
          MessageBox.show(
            "의류 스타일은 최대 3개까지 등록 가능합니다.",
            "danger",
            3000
          );
          return;
        }
        e.target.classList.remove("btn-primary");
        e.target.classList.add("btn-outline-primary");
        selectTagList.push(e.target.innerText);
      } else {
        e.target.classList.remove("btn-outline-primary");
        e.target.classList.add("btn-primary");
        selectTagList.splice(selectTagList.indexOf(e.target.innerText), 1);
      }
    });
  });
}

document.getElementById("registerProductBtn").addEventListener("click", () => {
  let sizes = [];
  const title = document.getElementById("productTitle").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const mainImageIdx = 0;
  const category = document.getElementById("productCategory").value;

  var size = document.getElementsByName("size").length;

  for (var i = 0; i < size; i++) {
    if (document.getElementsByName("size")[i].checked == true) {
      sizes.push(document.getElementsByName("size")[i].value);
    }
  }

  let config = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      "Content-Type": "multipart/form-data",
    },
  };
  var data = new FormData();
  data.append("category", category);
  data.append("mainImageIdx", mainImageIdx);
  uploadFileList.map((file) => {
    data.append("images", file);
  });
  data.append("price", price);
  sizes.map((val) => {
    data.append("sizes", val);
  });
  selectTagList.map((val) => {
    data.append("tags", val);
  });
  data.append("title", title);

  axios
    .post(PRODUCT_URL, data, config)
    .then((res) => {
      MessageBox.show("의류 등록 완료", "success", 3000);
      setTimeout(() => {
        location.href = "../../page/store-detail/store-detail.html";
      }, 3000);
    })
    .catch((error) => {
      MessageBox.show(error.response["data"]["msg"], "danger", 3000);
    });
});

/*태그검색*/
$(document).ready(function () {
  $("#search").keyup(function () {
    var k = $(this).val();
    var temp = $("#inputTag>button:contains('" + k + "')").css("color", "red");
    if ($(this).val() == "") {
      $(temp).hover(
        function () {
          $(this).css("color", "white");
        },
        function () {
          $(this).css("color", "var(--bs-teal");
        }
      );
      $(temp).css("color", "var(--bs-teal)");
      $(temp).show();
    } else {
      $("#inputTag > button").hide();
      $(temp).css("color", "red");
      $(temp).hover(function () {
        $(this).css("color", "red");
      });
      $(temp).show();
    }
  });
});

function insertComma(num) {
  if (num.length <= 3) {
    return num;
  }
  var count = Math.ceil(num.length / 3);
  var newNum = [];
  for (var i = 0; i < count; i++) {
    newNum.unshift(num.slice(-3 * (i + 1), num.length - 3 * i));
  }
  return newNum.join(",");
}

var sel_files = [];
/* att_zone : 이미지들이 들어갈 위치 id, btn : file tag id */
(imageView = function imageView(att_zone, btn) {
  var attZone = document.getElementById(att_zone);
  var btnAtt = document.getElementById(btn);
  // 이미지와 체크 박스를 감싸고 있는 div 속성
  var div_style =
    "display:inline-block;position:relative;" +
    "width:95%;height:100%;margin:5px;z-index:1";
  // 미리보기 이미지 속성
  var img_style = "width:100%;height:100%;z-index:none";
  // 이미지안에 표시되는 체크박스의 속성
  var chk_style =
    "width:30px;height:30px;position:absolute;font-size:24px;" +
    "right:0px;bottom:0px;z-index:999;background-color:rgba(255,255,255,0.1);color:#f00;line-height:1px;border:1px;";

  btnAtt.onchange = function (e) {
    if (e.target.files.length > 5) {
      alert("상품 등록 이미지는 최대 5개까지 가능합니다.");
      return;
    }
    var files = e.target.files;
    var fileArr = Array.prototype.slice.call(files);
    for (f of fileArr) {
      imageLoader(f);
    }
  };

  // 탐색기에서 드래그앤 드롭 사용
  attZone.addEventListener(
    "dragenter",
    function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );

  attZone.addEventListener(
    "dragover",
    function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );

  attZone.addEventListener(
    "drop",
    function (e) {
      var files = {};
      e.preventDefault();
      e.stopPropagation();
      var dt = e.dataTransfer;
      files = dt.files;
      for (f of files) {
        imageLoader(f);
      }
    },
    false
  );

  /*첨부된 이미지들을 배열에 넣고 미리보기 */
  imageLoader = function (file) {
    if (sel_files.length >= 5) {
      alert(sel_files.length);
      return;
    }
    sel_files.push(file);
    var reader = new FileReader();
    reader.onload = function (ee) {
      let img = document.createElement("img");
      img.setAttribute("style", img_style);
      img.src = ee.target.result;
      attZone.appendChild(makeDiv(img, file));
      mkThumbnail();
    };
    reader.readAsDataURL(file);
  };

  /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
  makeDiv = function (img, file) {
    var fileExtension = file.name.split(".");
    if (
      fileExtension[1].toLowerCase() == "jpg" ||
      fileExtension[1].toLowerCase() == "png" ||
      fileExtension[1].toLowerCase() == "gif" ||
      fileExtension[1].toLowerCase() == "bmp"
    ) {
    } else {
      alert("해당 파일은 이미지 파일이 아닙니다.");
      return;
    }
    uploadFileList.push(file);
    var div = document.createElement("div");
    div.setAttribute("style", div_style);

    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "x");
    btn.setAttribute("class", "x-div");
    btn.setAttribute("delFile", file.name);
    btn.setAttribute("style", chk_style);
    btn.onclick = function (ev) {
      var ele = ev.srcElement;
      var delFile = ele.getAttribute("delFile");
      for (var i = 0; i < sel_files.length; i++) {
        if (delFile == sel_files[i].name) {
          sel_files.splice(i, 1);
        }
      }
      dt = new DataTransfer();
      for (f in sel_files) {
        var file = sel_files[f];
        dt.items.add(file);
      }
      btnAtt.files = dt.files;
      var p = ele.parentNode;
      attZone.removeChild(p);
      mkThumbnail();
    };
    div.appendChild(img);
    div.appendChild(btn);
    return div;
  };
})("att_zone", "btnAtt");

/*썸네일 작업*/
function mkThumbnail() {
  if (sel_files[0] == null) {
    document.querySelector("div>#image_container>img").remove();
    var sam_thumb = document.createElement("img");
    sam_thumb.setAttribute("src", "images/sample16.jpg");
    sam_thumb.setAttribute("id", "thumbImg");
    document.querySelector("div>#image_container").appendChild(sam_thumb);
    return;
  }
  if (document.querySelector("div>#image_container>img") != null) {
    document.querySelector("div>#image_container>img").remove();
  }
  var img_thumb = document.createElement("img");
  img_thumb.setAttribute("src", "images/" + sel_files[0].name);
  img_thumb.setAttribute("id", "thumbImg");
  document.querySelector("div>#image_container").appendChild(img_thumb);
}

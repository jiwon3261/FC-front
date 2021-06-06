class PageIncluder {
  static includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            elmnt.innerHTML += this.responseText;
            elmnt.removeAttribute("include-html");
            PageIncluder.includeHTML();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
    changeNav();
  }
}

PageIncluder.includeHTML();

function changeNav() {
  const accessToken = localStorage.getItem("accessToken");
  if(accessToken === null || accessToken === ''){
    document.getElementById("notLoginMemberNav").style.display = "block";
    return;
  }
  
  const memberInfo = parseJwt(accessToken);

  if (isSeller(memberInfo)) {
    document.getElementById("sellerMemberNav").style.display = "block";
  } else if(isBuyer(memberInfo)){
    document.getElementById("buyerMemberNav").style.display = "block";
  } 
}

function isSeller(memberInfo) {
  if(memberInfo['role'][0] === 'ROLE_SELLER'){
    return true;
  }
  return false;
}

function isBuyer(memberInfo){
  if(memberInfo['role'][0] === 'ROLE_BUYER'){
    return true;
  }
  return false;
}

function parseJwt(token) {
  try {
    const base64HeaderUrl = token.split(".")[0];
    const base64Header = base64HeaderUrl.replace("-", "+").replace("_", "/");
    const headerData = JSON.parse(window.atob(base64Header));

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;

    return dataJWT;
  } catch (err) {
    return false;
  }
}

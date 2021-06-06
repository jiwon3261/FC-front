getAuth();

function getAuth() {
  const accessToken = localStorage.getItem('accessToken');
  if(parseJwt(accessToken)['role'][0] === 'ROLE_BUYER'){
    alert('페이지 권한이 존재하지 않습니다.')
    location.href="../../page/index/index.html";
    return;
  }
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

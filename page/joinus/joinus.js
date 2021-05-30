function join() {
    var inputPassword = document.getElementById('inputPassword').value;
    var inputPassword1 = document.getElementById('inputPassword1').value;
    if( inputPassword != inputPassword1 ) {
      alert("비밀번호가 일치하지 않습니다");
      return false;
    }
    // } else{
    //   alert("비밀번호가 일치합니다");
    //   return true;
    // }

  }
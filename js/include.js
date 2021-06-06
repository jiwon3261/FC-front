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

  
  function changeNav(){
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken !== null && accessToken !== ''){
      document.getElementById('notLoginMemberNav').style.display = 'none';
      document.getElementById('loginMemberNav').style.display = 'block';
    }else{
      document.getElementById('notLoginMemberNav').style.display = 'block';
      document.getElementById('loginMemberNav').style.display = 'none';
    }
  }

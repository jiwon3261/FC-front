
/*태그검색*/
$(document).ready(function() {
  $("#search").keyup(function() {
      var k = $(this).val();
      var temp = $( "#inputTag>button:contains('" + k + "')" ).css( 'color', 'red' );
      if($(this).val() == '') {
          $(temp).hover(function(){
              $(this).css('color','white');
          }, function() {
              $(this).css('color','var(--bs-teal');
          });
          $(temp).css('color','var(--bs-teal)');
          $(temp).show();
      }
      else {
          $("#inputTag > button").hide();
          $(temp).css('color','red');
          $(temp).hover(function(){
              $(this).css('color','red');
          })
          $(temp).show();
      }
  })
})

$(document).ready(function(){
  $('.input-phone').keyup (function () {
    var charLimit = $(this).attr("maxlength");
    if (this.value.length >= charLimit) {
        $(this).next().focus();
        return false;
    } else if(this.value == '02') {
      $(this).next().focus();
      return false;
    }
});
}); 
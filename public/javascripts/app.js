function replyClick(clicked_id) {
  window.location.href = `/${clicked_id}`;
}

$(document).ready(function(){
  $('#test').attr('disabled',true);
  $('#rule').keyup(function(){
    if($(this).val().length !=0)
        $('#test').attr('disabled', false);
    else
        $('#test').attr('disabled',true);
})


});

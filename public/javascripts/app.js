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

$('#main').attr('disabled', true);
$('#fiwareService, #fiwareService, #accessToken').bind('keyup', function () {
  if(allFilled2()) $('#main').removeAttr('disabled');
})

  $('#main2').attr('disabled', true);
  $('#fiwareServiceUpload, #fiwareServicePathUpload, #accessTokenUpload').bind('keyup', function () {
    if(allFilled('.test')) $('#main2').removeAttr('disabled');
  })

  function allFilled(forcheck) {
    var filled = true;
    $(forcheck).each(function() {
        if($(this).val() == '') filled = false;
    });
    return filled;
  }

  function allFilled2() {
    var filled = true;
    $('body input').each(function() {
        if($(this).val() == '') filled = false;
    });
    return filled;
}

});

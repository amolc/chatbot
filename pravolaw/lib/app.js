/* this is crude and stupid but we have all jquery here */

 $(document).ready(function(){
   console.log("app");

  var $messages = $('.messages-content');
   $messages.mCustomScrollbar();
   updateScrollbar($messages);


  $(window).scroll(function() {
      console.log('scrollvalue',scroll);
    	var scroll = $(window).scrollTop();
    	if (scroll > 400) {
      	$('.chat').css("position", "fixed");
        $('.chat').css("top", '65%');
      } else {
      	$('.chat').css("position", "absolute");
        $('.chat').css("top", '65%');
      }
    });
});

function updateScrollbar() {
    var $messages = $('.messages-content');
      $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });

  }

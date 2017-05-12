/* this is crude and stupid but we have all jquery here */

 $(document).ready(function(){
   
  var $messages = $('.messages-content');
   $messages.mCustomScrollbar();
   updateScrollbar($messages);  
   $('.cities').show();  
});

function updateScrollbar() {
    var $messages = $('.messages-content');
      $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
    
  }






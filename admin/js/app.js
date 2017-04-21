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

// function insertMessage() {   
//     var msg = $('.message-input').val();
//     if ($.trim(msg) == '') {
//       return false;
//     }
//     console.log('message',msg);
//     $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
//     $('.message-input').val(null);
//     updateScrollbar();
//     emitmsg(msg);
//   }





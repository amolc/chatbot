<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Pravola - Revolutionizing the Way People Fly Private</title>
<?php include("head.html"); ?>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

</head>

<body>
	<div class="header_container">
        <?php include("nav.html"); ?>
        
      
        
    	<?php include("ch_hdr.html"); ?>
    	
    	
    	
    </div>
    <main class="clearfix" >
        <section class="info_blocks_wrap child_hdr_banner">
        	<div class="wrapper clearfix">
                <h1>Contact Us</h1>
                <div class="breadcrumbs"><a href="index.php">Home</a><a href="contact_us.php">Contact Us</a></div>
            </div>
        </section>
        <section class="child_content">
        	<div class="wrapper clearfix">
            	<div class="page_nav">
                    <?php include("contactus_sidenav.html"); ?>
                    
                     <p><b>Executive Jets llc.</b> <br>
                     DBA "Pravola"
        <br>
        1 WORLD TRADE CENTER SUITE 8500
        <br>NEW YORK, NY 10007
<br>
+ 800-308-9056
        
                    
                </div>
                <div class="child_content_inner">
                    <section class="page_content">
                        <h2 class="blue">Contact Us Today</h2>
                        <hr class="content_hr2">
                        <form class="contact_form">
                            <div class="frm_row_wrap">
                                <div class="frm_fw">
                                    <label>Name<span class="red">*</span></label>
                                    <input type="text" name="contact_form[name]" placeholder="Your name">
                                </div>
                            </div>
                            <div class="frm_row_wrap">
                                <div class="frm_fw">
                                    <label>Email<span class="red">*</span></label>
                                    <input type="text" name="contact_form[email]" placeholder="Your email address">
                                </div>
                            </div>
                            <div class="frm_row_wrap">
                                <div class="frm_fw">
                                    <label>Message<span class="red">*</span></label>
                                    <textarea  name="contact_form[message]" placeholder="Your message"></textarea>
                                </div>
                            </div>
                            <button type="submit">Submit <i class="fa fa-arrow-circle-o-right"></i></button>
                        </form>
                    </section>
                   
                </div>
            </div>
        </section>
    </main>
    <?php include("footer.html"); ?>
	<script type="text/javascript">
		$( document ).ready(function() {
			// SET ACTIVE NAV TAB
			$("#contU").addClass("active");
		});
	</script>
</body>
</html>

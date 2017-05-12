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
                <h1>Join Jet Cards</h1>
                <div class="breadcrumbs"><a href="index.php">Home</a><a href="javascript:void(0);">Jet Cards</a><a href="javascript:void(0);">Join Jet Cards</a></div>
            </div>
        </section>
        <section class="child_content">
        	<div class="wrapper clearfix">
            	<ul class="page_nav">
                    <?php include("jetcards_sidenav.html"); ?>
                </ul>
                <div class="child_content_inner">
                    <section class="page_content">
                        <h2 class="blue">Jet Card Sign Up</h2>
                        <p>Enter your information below and we will contact you shortly!</p>
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
                            <button type="submit">Submit <i class="fa fa-arrow-circle-o-right"></i></button>
                        </form>
                    </section>
                    <?php include("aside.html"); ?>
                </div>
            </div>
        </section>
    </main>
    <?php include("footer.html"); ?>
</body>
</html>

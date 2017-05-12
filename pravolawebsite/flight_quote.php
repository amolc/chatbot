<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Pravola - Revolutionizing the Way People Fly Private</title>
<?php include("head.html"); ?>

<link href="css/jquery-ui.css" rel="stylesheet">
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
                <h1>Flight Quote</h1>
                <div class="breadcrumbs"><a href="index.php">Home</a><a href="contact_us.php">Contact Us</a><a href="flight_quote.php">Flight Quote</a></div>
            </div>
        </section>
        <section class="child_content">
        	<div class="wrapper clearfix">
            	<ul class="page_nav">
                    <?php include("contactus_sidenav.html"); ?>
                </ul>
                <div class="child_content_inner">
                	<section class="page_content">
                	<div id="tabs">
                        <ul>
                            <li><a href="#tabs-1">Round Trip</a></li>
                            <li><a href="#tabs-2">Multi Leg</a></li>
                            <li><a href="#tabs-3">One Way</a></li>
                        </ul>
                        <div id="tabs-1">
                                <h2 class="blue">Round Trip</h2>
                                <hr class="content_hr2">
                                <form class="contact_form clearfix">
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                            <label>Name<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[name]" placeholder="Your name">
                                        </div>
                                        <div class="frm_hw">
                                            <label>Phone<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[phone]" placeholder="Your phone number">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_fw">
                                            <label>Email<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[email]" placeholder="Your email address">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                            <label>Traveling From</label>
                                            <input type="text" name="flight_quote[from]">
                                        </div>
                                        <div class="frm_hw">
                                            <label>Traveling To</label>
                                            <input type="text" name="flight_quote[from]">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                        	<a class="cal_btn" href="javascript:void(0);"><i class="fa fa-calendar"></i></a>
                                            <label>Departure Date</label>
                                            <input class="date_input" type="text" name="flight_quote[departure_date]">
                                        </div>
                                        <div class="frm_hw">
                                        	<a class="cal_btn" href="javascript:void(0);"><i class="fa fa-calendar"></i></a>
                                            <label>Return Date</label>
                                            <input class="date_input" type="text" name="flight_quote[return_date]">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                            <label>Passengers</label>
                                            <select>
                                            	<option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5-10</option>
                                                <option>10-20</option>
                                                <option>20-50</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button type="submit">Submit <i class="fa fa-arrow-circle-o-right"></i></button>
                                </form>
                        </div>
                        <div id="tabs-2">
                                <h2 class="blue">Multi Leg</h2>
                                <hr class="content_hr2">
                                <form class="contact_form">
                                     <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                            <label>Name<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[name]" placeholder="Your name">
                                        </div>
                                        <div class="frm_hw">
                                            <label>Phone<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[phone]" placeholder="Your phone number">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_fw">
                                            <label>Email<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[email]" placeholder="Your email address">
                                        </div>
                                    </div>
                                    <div class="flight_wrap clearfix">
                                    	<h3>Flight 1</h3>
                                        <div class="frm_row_wrap">
                                        	<div class="frm_hw">
                                                <label>Traveling To</label>
                                                <input type="text" name="flight_quote[from]">
                                            </div>
                                             <div class="frm_hw">
                                                <a class="cal_btn" href="javascript:void(0);"><i class="fa fa-calendar"></i></a>
                                                <label>Departure Date</label>
                                                <input class="date_input" type="text" name="flight_quote[departure_date]">
                                            </div>
                                        </div>
                                        <div class="frm_row_wrap">
                                            <div class="frm_hw">
                                                <label>Passengers</label>
                                                <select>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5-10</option>
                                                    <option>10-20</option>
                                                    <option>20-50</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="frm_row_wrap">
                                            <div class="frm_fw add_leg red">
                                                <input class="check_box" type="checkbox" name="add_leg">
                                                Add Another Leg
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit">Submit <i class="fa fa-arrow-circle-o-right"></i></button>
                                </form>
                        </div>
                        <div id="tabs-3">
                                <h2 class="blue">One Way</h2>
                                <hr class="content_hr2">
                                <form class="contact_form clearfix">
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                            <label>Name<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[name]" placeholder="Your name">
                                        </div>
                                        <div class="frm_hw">
                                            <label>Phone<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[phone]" placeholder="Your phone number">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_fw">
                                            <label>Email<span class="red">*</span></label>
                                            <input type="text" name="flight_quote[email]" placeholder="Your email address">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                            <label>Traveling From</label>
                                            <input type="text" name="flight_quote[from]">
                                        </div>
                                        <div class="frm_hw">
                                            <label>Traveling To</label>
                                            <input type="text" name="flight_quote[from]">
                                        </div>
                                    </div>
                                    <div class="frm_row_wrap">
                                        <div class="frm_hw">
                                        	<a class="cal_btn" href="javascript:void(0);"><i class="fa fa-calendar"></i></a>
                                            <label>Departure Date</label>
                                            <input class="date_input" type="text" name="flight_quote[departure_date]">
                                        </div>
                                        <div class="frm_hw">
                                            <label>Passengers</label>
                                            <select>
                                            	<option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5-10</option>
                                                <option>10-20</option>
                                                <option>20-50</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit">Submit <i class="fa fa-arrow-circle-o-right"></i></button>
                                </form>
                        </div>
                    </div>
                    </section>
                    <aside class="welcome_join">
                    	<div class="join_now_img_link" >
                        	<img src="images/travel_anywhere.jpg">
                            <h4>Travel Anywhere</h4>
                        </div>
                        <p>Each flight mission is tailored to your needs. Please let us know your requirements for your trip. A representative of Pravola will be in contact with you to discuss your Elite Service. Our Company will give you a new level of private aviation service and efficiency which is legendary at Advanced Jets.</p>
                    </aside>
                </div>
            </div>
        </section>
    </main>
    <?php include("footer.html"); ?>
	<script src="js/jquery-ui.js"></script>
    <script>

    $( "#tabs" ).tabs();

    // Hover states on the static widgets
    $( "#dialog-link, #icons li" ).hover(
        function() {
            $( this ).addClass( "ui-state-hover" );
        },
        function() {
            $( this ).removeClass( "ui-state-hover" );
        }
    );

		$( document ).ready(function() {
			// SET ACTIVE NAV TAB
			$("#planIt").addClass("active");
		});
	</script>
</body>
</html>

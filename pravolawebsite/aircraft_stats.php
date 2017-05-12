<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Pravola - Revolutionizing the Way People Fly Private</title>
<?php include("head.html"); ?>

<link href="css/jquery-ui.css" rel="stylesheet">
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<!-- bxSlider Javascript file -->
<script src="js/jquery.bxslider.min.js"></script>
<!-- bxSlider CSS file -->
<link href="css/jquery.bxslider.css" rel="stylesheet" />

<script>
function bxHeight(slider,newHeight, animate) {
	if(animate == null) {
		animate = true;
	}

	if(animate) {
		slider.parents(".bx-wrapper,.bx-viewport").animate({height:newHeight + "px"},500);
	}
	else {
		slider.parents(".bx-wrapper,.bx-viewport").css("height",newHeight + "px");
	}
}

var slider = "";
$(document).ready(function(){
	  // runs whenever window is resized
	  $(window).on("resize",function() {
		 var newHeight = slider.getCurrentSlideElement().height();
		 bxHeight(slider,newHeight,false);
	  });
	  $(window).on("orientationchange",function() {
		 var newHeight = slider.getCurrentSlideElement().height();
		 bxHeight(slider,newHeight,false);
	  });

  	  slider = $('.bxslider').bxSlider({
	  	mode: 'horizontal',
	  	adaptiveHeight: true,
	  	nextText: '<i class="fa fa-chevron-circle-right"></i>',
		prevText: '<i class="fa fa-chevron-circle-left"></i>',
		onSlideBefore: function($elem, oldIndex, newIndex) {
			bxHeight(slider,$elem.height());
		}
	  });
	  $("#spec_aircraft li").click(function(e){
	  e.preventDefault();

	  var id = $(this).index();
	  	slider.goToSlide(id);
	  });

});
</script>

</head>

<body>
	<div class="header_container">
        <?php include("nav.html"); ?>
    	<?php include("ch_hdr.html"); ?>
    </div>
    <main class="clearfix" >
        <section class="info_blocks_wrap child_hdr_banner">
        	<div class="wrapper clearfix">
                <h1>Aircraft</h1>
                <div class="breadcrumbs"><a href="index.php">Home</a><a href="javascript:void(0);">Aircraft</a><a href="javascript:void(0);">Light Jets</a></div>
            </div>
        </section>
        <section class="child_content">
        	<div class="wrapper clearfix">
            	<ul class="page_nav aircraft_nav">
                    <?php include("aircraft_sidenav.html"); ?>
                </ul>
                <div class="child_content_inner inner_fw">
                    <section class="aircraft_page">
                    	<h2 class="blue aircraft_type_h">Light Jets</h2>
                        <ul class="specific_aircraft_list" id="spec_aircraft">
						<!-- CREATE A LINK FOR EACH SLIDE TO GO DIRECTLY TO AIRCRAFT -->
                        	<li><a href="">Aircraft Name 1</a></li>
                            <li><a href="">Aircraft Name 2</a></li>
                        </ul>
                        <ul class="bxslider">
                            <li>
                            <!--Aircraft Name -->
                            	<h3 class="aircraft_label">Hawker 200</h3>
                                <div id="tabs" class="aircraft_tabs">
                                    <ul> <!--Update Tab IDs -->
                                        <li><a href="#tabs-1">Exterior View</a></li>
                                        <li><a href="#tabs-2">Interior View</a></li>
                                        <li><a href="#tabs-3">Layout View</a></li>
                                    </ul>
                                    <div id="tabs-1">
                                        <img class="aircraft_slide_img" src="images/aircraft_images/very_light_jets/p.jpg">
                                    </div>
                                    <div id="tabs-2">
                                        <img class="aircraft_slide_img" src="images/aircraft_images/very_light_jets/i.jpg">
                                    </div>
                                    <div id="tabs-3">
                                        <img class="aircraft_slide_img" src="images/aircraft_images/very_light_jets/l.jpg">
                                    </div>
                                </div>

                                <p>“After tallying up the changes, there was no question that this business jet had graduated into a new class and deserved nothing less than being called a Hawker, a brand synonymous with constant innovation, high performance, proven reliability and unmatched cabin comfort,” said Shawn Vick, executive vice president of Hawker Beechcraft.</p>
                                <p>The Hawker 200 is capable of traveling long distances at fast speeds, with a much lower operating cost than its competitors. Offering over 75 cubic feet of baggage volume and speeds of over 530 MPH, the Hawker 200 is in a class of its own. </p>
                                <!--------------------------------------
                                GENERAL STATISTICS FOR AIRCRAFT CATEGORY
                                ---------------------------------------->
                                <h3>Performance <i class="fa fa-angle-double-down blue"></i></h3>
                                            <hr>
                                            <!--ROW ONE-->
                                            <div class="three_col_box_wrap clearfix">
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Passenger Seating:</div>
                                                    <div class="jet_stat">4 PASSENGERS</div>
                                                    <div class="passengers">
                                                    	<i class="fa fa-user"></i>
                                                        <i class="fa fa-user"></i>&nbsp;<span class="lt_grey pass_comment"> (x2)</span>
                                                    </div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Airspeed:</div>
                                                    <div class="jet_stat">544 mph/876 kph</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Flight Range:</div>
                                                    <div class="jet_stat">1208 miles</div>
                                                </div>
                                            </div>
                                            <!--ROW TWO-->
                                            <div class="three_col_box_wrap clearfix">
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Climb Rate:</div>
                                                    <div class="jet_stat">2900 ft/min</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Cabin Length:</div>
                                                    <div class="jet_stat">13.6 feet/4.11 meters</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Cabin Width:</div>
                                                    <div class="jet_stat">5.5 feet/1.68 meters</div>
                                                </div>
                                            </div>
                                            <!--ROW THREE-->
                                            <div class="three_col_box_wrap clearfix">
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Cabin Height:</div>
                                                    <div class="jet_stat">5.5 feet/1.68 meters</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Lavatory Style:</div>
                                                    <div class="jet_stat">full lavatory</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Baggage Volume:</div>
                                                    <div class="jet_stat">76.9 cubic feet/2.2 cubic meters</div>
                                                </div>
                                            </div>
                                            <hr>
                            </li>
                            <li>
                            <!--Aircraft Name -->
                            	<h3 class="aircraft_label">Aircraft Name 2</h3>
                                <div id="tabs2" class="aircraft_tabs">
                                    <ul> <!--Update Tab IDs -->
                                        <li><a href="#tabs2-1">Exterior View</a></li>
                                        <li><a href="#tabs2-2">Interior View</a></li>
                                        <li><a href="#tabs2-3">Layout View</a></li>
                                    </ul>
                                    <div id="tabs2-1">
                                        <img class="aircraft_slide_img" src="images/aircraft_images/very_light_jets/citation_mustang_exv.jpg">
                                    </div>
                                    <div id="tabs2-2">
                                        <img class="aircraft_slide_img" src="images/child_images/trip_type/hotels_resorts.jpg">
                                    </div>
                                    <div id="tabs2-3">
                                        <img class="aircraft_slide_img" src="images/child_images/trip_type/casinos.jpg">
                                    </div>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis consequat nulla, at volutpat mauris porta sit amet. Integer facilisis ante eu auctor vehicula. Sed et nulla quis nulla tincidunt feugiat. Quisque faucibus quam at purus varius, faucibus mollis urna viverra. Donec lobortis euismod quam sit amet egestas. In tristique nulla id sodales auctor. Nam sollicitudin gravida eleifend. </p>
                                <!--------------------------------------
                                GENERAL STATISTICS FOR AIRCRAFT CATEGORY
                                ---------------------------------------->
                                <h3>Performance <i class="fa fa-angle-double-down blue"></i></h3>
                                            <hr>
                                            <!--ROW ONE-->
                                            <div class="three_col_box_wrap clearfix">
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Passenger Seating:</div>
                                                    <div class="jet_stat">4 PASSENGERS</div>
                                                    <div class="passengers">
                                                    	<i class="fa fa-user"></i>
                                                        <i class="fa fa-user"></i>&nbsp;<span class="lt_grey pass_comment"> (x2)</span>
                                                    </div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Airspeed:</div>
                                                    <div class="jet_stat">300 mph/400 kph</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Flight Range:</div>
                                                    <div class="jet_stat">1000 miles</div>
                                                </div>
                                            </div>
                                            <!--ROW TWO-->
                                            <div class="three_col_box_wrap clearfix">
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Climb Rate:</div>
                                                    <div class="jet_stat">2000 ft/min</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Cabin Length:</div>
                                                    <div class="jet_stat">10 feet/4.5 meters</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Cabin Width:</div>
                                                    <div class="jet_stat">3.5 feet/2.52 meters</div>
                                                </div>
                                            </div>
                                            <!--ROW THREE-->
                                            <div class="three_col_box_wrap clearfix">
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Cabin Height:</div>
                                                    <div class="jet_stat">5.5 feet/1.68 meters</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Lavatory Style:</div>
                                                    <div class="jet_stat">full lavatory</div>
                                                </div>
                                                <div class="three_col_box">
                                                    <div class="jet_stat_label blue">Baggage Volume:</div>
                                                    <div class="jet_stat">76.9 cubic feet/2.2 cubic meters</div>
                                                </div>
                                            </div>
                                            <hr>
                            </li>
                        </ul>
                        <p><strong>OUR RECOMMENDATION:</strong> The least expensive way to travel in a jet. A smooth ride, with the luxury of a quiet engine makes it the most economical choice for short trips.</p>

                    </section>
                </div>
            </div>
        </section>
    </main>
    <?php include("footer.html"); ?>
    <script src="js/jquery-ui.js"></script>

    <script>

    $( "#tabs, #tabs2, #tabs3, #tabs4" ).tabs({
		activate: function(event,ui) {
			 var newHeight = slider.getCurrentSlideElement().height();
			 bxHeight(slider,newHeight);
		}
	});

    // Hover states on the static widgets
    $( "#dialog-link, #icons li" ).hover(
        function() {
            $( this ).addClass( "ui-state-hover" );
        },
        function() {
            $( this ).removeClass( "ui-state-hover" );
        }
    );

    </script>


</body>
</html>

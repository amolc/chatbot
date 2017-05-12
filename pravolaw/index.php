<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Pravola - Revolutionizing the Way People Fly Private</title>
<?php include("head.html"); ?>
<link href="css/jquery-ui.css" rel="stylesheet">
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>

<body >
  
	<div class="header_container home_hc">
    	<?php include("nav.html"); ?>
        <header class="wrapper">
            <section class="clearfix">
            	<a id="logo" href="index.php" alt="Pravola" ><img src="images/pravola-logo.svg" ></a>
                <!-- <div class="jet_wrap">
                	<img class="jet" src="images/header_jet.png" >
                </div> -->
                <div class="hdr_title_wrap">
                    <h1 class="title">Revolutionizing</h1>
                    <h2 class="tt_upper">the Way People Fly Private</h2>
                    <p>By making it easier to book trips, more access to available planes, more cost effective, and the fastest quoting system available.</p>
					<p>We think that is pretty cool... give us a try today!  </p>
                </div>
				<a href="javascript:void(0);" id="scroll_down"><i class="fa fa-angle-down"></i></a>
            </section>

        </header>
        <div class="hdr_hr"></div>
		<video autoplay loop poster="images/header_sky_bg4.jpg" class="bgvideo" width="100%">
			<source src="images/clouds-s.webm" type="video/webm">
			<source src="images/clouds-s.mp4" type="video/mp4">
		</video>
    </div>
    <main class="clearfix" >
        <section class="info_blocks_wrap home_ib">
        	<div class="wrapper clearfix">
                <a href="legendary_service.php" onclick="void(0)" class="info_block clearfix">
                    <div class="circle ib_1">
						<i class="fa fa-question-circle-o"></i>

                    </div>
                    <div class="ib_text_wrap">
                        <h3>Why Pravola</h3>
                        <p></p>
                        <div class="readmore rm_1">Read More</div>
                   	</div>
                </a>
                <a href="flight_quote.php" class="info_block clearfix">
                    <div class="circle ib_2">
						<i class="fa fa-plane"></i>

                    </div>
                    <div class="ib_text_wrap">
                        <h3>Flight Quote</h3>
                        <p></p>
                        <div class="readmore rm_1">Read More</div>
                    </div>
                </a>
                <a href="join_jet_cards.php" class="info_block clearfix">
                    <div class="circle ib_3">
						<i class="fa  fa-credit-card"></i>

                    </div>
                    <div class="ib_text_wrap">
                        <h3>Jet Card</h3>
                        <p></p>
                        <div class="readmore rm_1">Read More</div>
                    </div>
                </a>
            </div>
        </section>
        <section class="home_content">
        	<div class="wrapper clearfix">
            	<h2 class="blue tt_upper">Pravola Legendary Service</h2>
                <p>Our legendary service keeps clients flying private with us for years. We specialize in CEO business executive trips, and frequently book same day transcontinental business round trips using two aircraft and two crews, All of our flights boast the most rigid safety standards, certified by Wyvern Safety Standard Company. We also have a voice on the leadership council of the NBAA, the private aviation industry association that lobbies directly to Congress.</p>
                <p>Pravola’s mission is to give you something you didn’t get on your last flights: efficiency and innovation. On any given day, there are approximately 3,200 aircraft in North America available for private flights. We sift through dozens of fleets, to provide you with the most perfect fit for your needs. For example, we can provide anything from a Citation X that flies at .92 Mach to a fuel efficient very light jet such as a Phenom 100 for your flight mission.</p>
                <div class="partner_logos">
                    <a href="http://www.wyvernltd.com/" target="_blank"><img src="images/wyvern_logo.jpg" ></a></li>
                    <a href="http://www.nbaa.org/" target="_blank"><img src="images/nbaa_logo.jpg" ></a></li>
                </div>
                <a href="legendary_service.php" class="readmore rm_2">Read More</a>
            </div>
        </section>
    </main>


   <script src="https://npmcdn.com/imagesloaded@4.1/imagesloaded.pkgd.min.js"></script>
    <?php include("footer.html"); ?>
	<script type="text/javascript">
		$( document ).ready(function() {
			// SET ACTIVE NAV TAB
			$("#homePg").addClass("active");
			$('body').imagesLoaded()
			  .always( function( instance ) {
			    console.log('all images loaded');
			  })
			  .done( function( instance ) {
			    console.log('all images successfully loaded');
			  })
			  .fail( function() {
			    console.log('all images loaded, at least one is broken');
			  })
			  .progress( function( instance, image ) {
			    var result = image.isLoaded ? 'loaded' : 'broken';
			    console.log( 'image is ' + result + ' for ' + image.img.src );
			  });
		});
	</script>
   
</body>
</html>

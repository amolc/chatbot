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
                <h1>About Jet Cards</h1>
                <div class="breadcrumbs"><a href="index.php">Home</a><a href="javascript:void(0);">Jet Cards</a><a href="javascript:void(0);">About Jet Cards</a></div>
            </div>
        </section>
        <section class="child_content">
        	<div class="wrapper clearfix">
            	<ul class="page_nav">
                    <?php include("jetcards_sidenav.html"); ?>
                </ul>
                <div class="child_content_inner">
                    <section class="page_content">
                        
                        <h2 class="blue">Join Pravola Today</h2>
                        <p>Companies that fly private over commercial save hundreds of hours in travel overhead time; allowing high level execs to maximize their shareholder value by reaching more meetings, on time, anywhere in the world. Private aviation is valuable to meet your schedule and travel to destinations not served by commercial aviation. Private aircraft get you almost anywhere in the world as fast as possible, with no frustrating wait times in line, airport hang-ups, long walks, airport parking hassles, layovers, or inefficient routes. Fly at times, and under conditions that commercial airlines would never permit. Whether you are a CEO, high level management team, professional athlete, high profile celebrity or family—private aviation offers the maximum in efficiency, privacy, comfort, and convenience.</p>
                        <a class="join_btn" href="join_jet_cards.php">JOIN NOW <i class="fa fa-arrow-circle-o-right gold_1"></i></a>
                    </section>
                    <?php include("aside.html"); ?>
                </div>
            </div>
        </section>
    </main>
    <?php include("footer.html"); ?>
	<script type="text/javascript">
		$( document ).ready(function() {
			// SET ACTIVE NAV TAB
			$("#jetC").addClass("active");
		});
	</script>
</body>
</html>

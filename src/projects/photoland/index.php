<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
<script src="jquery.timers.js"></script>
<script type="text/javascript" src="jquery.lightbox-0.5.pack.js"></script>    
<script>
 	var X = 100, Y = 100;
        jQuery(function(){ 
					

                $('#map a').lightBox();
                $(".item").mouseenter(function(){
											   if (!moving) {
												   id = this.id;
												   $('#'+id).animate({   opacity: 1      }, 350, function() {  });}
											  });
				
                $(".item").mouseleave(function(){
											   if (!moving) {											   
												   id = this.id;											   
												   $('#'+id).animate({   opacity: 0.6     }, 1500, function() {  });}											   
											  });				
				
	            $('body').mousemove(function(e){	
											  X = e.pageX;
											  Y = e.pageY;

											 });
				
				
				$("#map").everyTime(20, function(i) {
                                               W = $('body').width();
                                               H = $('body').height();
											   coordX = parseInt($('#map').css('margin-left'));
											   coordY = parseInt($('#map').css('margin-top'));
											   contW = $('#map').width();
											   contH = $('#map').height();
											   moving = false;
											   
											  if ((X < 30)&&(coordX<0)){
												  $('#map').css('margin-left',
																coordX+50+'px'
																);
												   moving = true;

												  }

											  if ((Y < 30)&&(coordY<0)){
												  $('#map').css('margin-top',
																coordY+50+'px'
																);
												   moving = true;
												  }


											  if ((X > W - 30)&&(-coordX<W)){
												  $('#map').css('margin-left',
																coordX-50+'px'
																);
												   moving = true;												  
												  }
												  

											  if ((Y > H - 30)&&(-coordY<H)){
												  $('#map').css('margin-top',
																coordY-80+'px'
																);
												   moving = true;												  
												  }


				});				
				
		  });  
		
</script>
 <link rel="stylesheet" type="text/css" href="jquery.lightbox-0.5.css" media="screen" />   
<style>
 .item{
	 width: 400px;
	 height: 300px;
	 overflow: hidden;
	 float: left;
	 opacity: 0.6;

	 }
.item img{
	width: 120%;}	 
	
body{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color:#000;
	}
	
#map{
    background-color: #000;
	width: 200%;
	display: table;}	
</style>
<body>
<div id="map">
<?php
$dir = "photo/";

// Открыть заведомо существующий каталог и начать считывать его содержимое
if (is_dir($dir)) {
	$i = 0;
   if ($dh = opendir($dir)) {
       while (($file = readdir($dh)) !== false) {
           if (($file!='..')&&($file!='.')){
			   $i = $i + 1;
		   print "<div class='item' id='num$i'><a href='$dir$file'><img src='$dir$file'></a></div>";/* . filetype($dir . $file) . "\n";*/}
       }
       closedir($dh);
   }
}
?>
</div>
</body>
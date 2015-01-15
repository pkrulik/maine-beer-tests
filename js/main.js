// if the mouse changes directions stop the animation
// if the animation is stopped allow the hover to kick in
// if the div is animating dont allow hover

var $beerWrapper = $('#beer-wrapper');
var $beerWrapperInterior = $('#beer-wrapper-interior');
var $beer = $('.beer');

var beerWrapperWidth = $beerWrapper.width();
var beerWrapperOffset = $beerWrapper.offset().left;

var beerWidth = $beer.outerWidth();

// set the width of the interior to the width of all the beer items
$beerWrapperInterior.css({width:beerWidth * $beer.length })

var beerWrapperInteriorWidth = $beerWrapperInterior.width();
var $beerWrapperInteriorOffset = $beerWrapperInterior.offset().left - beerWrapperOffset;

var fullSpeed = 80;
var animating = 0;
var lastPosition;
var hoverSide;
var idealSpeed = 5000; // in seconds
var beersPerSecond = -1000; // in ms

$('.beerWrapperWidth').html(beerWrapperWidth)
$('.beerWrapperOffset').html(beerWrapperOffset)

$('.beerWrapperInteriorWidth').html(beerWrapperInteriorWidth)

$('.beerWidth').html(beerWidth)

$beerWrapperInterior.css({left:0})



$beerWrapper.mouseenter(function(){
    
    console.log('mouseover')
    
    $(this).mousemove(function(e){
        
        
        mousemoveX = e.clientX - beerWrapperOffset;
        
        // if we hover over the left side
        if (mousemoveX < beerWrapperWidth * .333 ) {
            
            hoverSide = 'left';
    
        } 
      
      
        // if we hover over the right side
        else if (mousemoveX > beerWrapperWidth * .677 ) {
            
            hoverSide = 'right';
            
        } 
        
        else {
            
            hoverSide = 'middle';
            
        }
        
        
        
        
        if (hoverSide === 'left') {
            
            console.log(lastPosition - mousemoveX)
            
            if (lastPosition - mousemoveX > 3 && animating == 0 && !($beerWrapperInteriorOffset >= 0) ) {
                
                animateLeft();
                
            } else if (lastPosition - mousemoveX < -3 && animating == 1 && !($beerWrapperInteriorOffset >= 0) ) {
                
                stopAnimation();                
            
            }
            
            
        } 
        
        else if (hoverSide === 'right') {
            
            console.log(lastPosition - mousemoveX)
            
            if (lastPosition - mousemoveX < 0 && animating == 0 && !($beerWrapperInteriorOffset <= - (beerWrapperInteriorWidth - beerWrapperWidth) ) ) {
                
                animateRight();
                
            } else if (lastPosition - mousemoveX > 0 && animating == 1 && !($beerWrapperInteriorOffset <= - (beerWrapperInteriorWidth - beerWrapperWidth) ) ) {
                
                stopAnimation();    
            
            }
            
            
        }
        
        $('.mousemoveX').html(mousemoveX);
        $('.lastPosition').html(lastPosition);


        lastPosition =  mousemoveX;
        
        $('.hoverSide').html(hoverSide);
        
        
        
    });
    
});


// this is causing issues in firefox

$beerWrapper.mouseleave(function(){
    
    if ( animating == 1 ) {
        stopAnimation();
    } 
    
    console.log('hoveredoff')
    
});



// what happens when you hover on the left side  
function animateLeft() {
    
    animating = 1;
    
    $beerWrapperInteriorOffset =  Math.round($beerWrapperInterior.offset().left - beerWrapperOffset);
    
                    // (2000/400) 
                    // = 5 beers off screen      
    idealSpeed =  ($beerWrapperInteriorOffset / beerWidth) * beersPerSecond; // returns in ms
    
    
    $('.speed').html(idealSpeed)

    
    if ($beerWrapperInteriorOffset <= 0) {
        $beerWrapperInterior.animate({left:  0 }, idealSpeed, 'easeOutQuad'  )  // need to create a variable for this    
    } else {
        $beerWrapperInterior.css({left:  0 })      
    }

    
    $beer.removeClass('hoverable');
    
    console.log('animate left')
    
    $('.beerWrapperInteriorOffset').html($beerWrapperInteriorOffset)

    
    
  }

  // what happens when you hover on the right side
  function animateRight() {
    
    animating = 1;
   
    $beerWrapperInteriorOffset =  Math.round($beerWrapperInterior.offset().left - beerWrapperOffset);
    
    idealSpeed =  ( (beerWrapperInteriorWidth - beerWrapperWidth + $beerWrapperInteriorOffset  ) / beerWidth) * -beersPerSecond; // returns in ms
      
    $beerWrapperInterior.animate({left: - (beerWrapperInteriorWidth - beerWrapperWidth) }, idealSpeed, 'easeOutQuad'   )  // need to create a variable for this    
        
    $beer.removeClass('hoverable');
      
    console.log('animate right')
    
    $('.beerWrapperInteriorOffset').html($beerWrapperInteriorOffset)
    $('.speed').html(idealSpeed)
    
  }
  
  // function to stop the animation
  function stopAnimation() {
    
    animating = 0;

    $beerWrapperInterior.stop();
    
    $beer.addClass('hoverable');
    
    console.log('stop the fucking animation')
    
  }


/*
 $('.hoverable').mouseover(function(){
  
    setTimeout(function(){
        console.log($beerWrapperInteriorOffset)
        $beerWrapperInteriorOffset =- 100;
        $beerWrapperInterior.stop().animate({left:  $beerWrapperInteriorOffset}, 'fast')
        console.log($beerWrapperInteriorOffset)
    },250);
    
     
 });
 
 
 $('.hoverable').mouseout(function(){
  
    console.log($beerWrapperInteriorOffset)
    $beerWrapperInteriorOffset += 100;
    $beerWrapperInterior.stop().animate({left:  $beerWrapperInteriorOffset}, 'fast')
    console.log($beerWrapperInteriorOffset)
    
     
 });
*/
 
 
  $('.hoverable').mouseover(function(){
  
    $beerWrapperInterior.css({width:beerWidth * $beer.length + 85 })
  
  });
  
  $('.hoverable').mouseout(function(){
  
    $beerWrapperInterior.css({width:beerWidth * $beer.length })
  
  });
 
 
 
 
 
 
 
 
 
 
 
 
 


var $win = $(window);
var $body = $('body');
var $beerWrapper = $('#beer-wrapper');
var $beerWrapperInterior = $('#beer-wrapper-interior');
var $beer = $('.beer');


var fullSpeed = 80;
var animating = 0;
var lastPosition;
var hoverSide;
var idealSpeed = 5000; // in seconds
var beersPerSecond = -1000; // in ms


// call the layout() function on resize;
$win.resize( layout );


// page load function
function init() {
    
    // make sure the interior beer wrapper is at it's 
    // starting point on load
    $beerWrapperInterior.css({left:0})
    
    // size all elements accordingly
    layout();
    
    
    
}


// handle all dimension gather and resizing here
function layout() {
    
    winWidth = $win.width();
    winHeight = $win.height();
    
    beerWrapperWidth = $beerWrapper.width();
    beerWrapperOffset = $beerWrapper.offset().left;
    
    beerWidth = $beer.outerWidth();
    
    // set the width of the interior to the width of all the beer items
    $beerWrapperInterior.css({width:beerWidth * $beer.length })
    
    beerWrapperInteriorWidth = $beerWrapperInterior.width();
    $beerWrapperInteriorOffset = $beerWrapperInterior.offset().left - beerWrapperOffset;
    
    console.log('layout')
    
}




// hover over beer section
$beerWrapper.mouseenter(function(){
    
    console.log('mouseover')
    
    // track the mouse position
    $(this).mousemove(function(e){
        
        
        // store the most position
        mousemoveX = e.clientX - beerWrapperOffset;
        
        // TRACK HOVER POSITION
        // if we hover over the left side
        if (mousemoveX < beerWrapperWidth * .333 ) {
            
            hoverSide = 'left';
    
        } 
      
      
        // if we hover over the right side
        else if (mousemoveX > beerWrapperWidth * .677 ) {
            
            hoverSide = 'right';
            
        } 
        
        // if we're in the middle
        else {
            
            hoverSide = 'middle';
            
        }
        
        
        
        // WHAT HAPPENS WHEN WE HOVER OVER A CERTAIN SECTION
        if (hoverSide === 'left') {
            
//             console.log(lastPosition - mousemoveX)
            
            // if the last position is greater than the curreposition
            // and the page is not currently animating
            // and the interior offset is not 0 or greater
            if (lastPosition - mousemoveX > 0 && animating == 0 && !($beerWrapperInteriorOffset >= 0) ) {
                
                animateLeft();
                
            } 
            
            
            // else if the last position is small ther then current position
            // the page is animating
            // and the interior offset is not greater than or equal to zero
            else if (lastPosition - mousemoveX < 0 && animating == 1 && !($beerWrapperInteriorOffset >= 0) ) {
                
                stopAnimation();                
            
            }
            
        } 
        
        else if (hoverSide === 'right') {
            
//             console.log(lastPosition - mousemoveX)
            
            if (lastPosition - mousemoveX < 0 && animating == 0 && !($beerWrapperInteriorOffset <= - (beerWrapperInteriorWidth - beerWrapperWidth) ) ) {
                
                animateRight();
                
            } else if (lastPosition - mousemoveX > 0 && animating == 1 && !($beerWrapperInteriorOffset <= - (beerWrapperInteriorWidth - beerWrapperWidth) ) ) {
                
                stopAnimation();    
            
            }
            
        }
        
        $('.mousemoveX').html(mousemoveX);
        $('.lastPosition').html(lastPosition);


        lastPosition =  mousemoveX;
                
    });
    
});



$beerWrapper.mouseleave(function(){
    
    if ( animating == 1 ) {
        stopAnimation();
    } 
    
    console.log('hovered off')
    
});



// what happens when you hover on the left side  
function animateLeft() {
    
    animating = 1;
    
    $beerWrapperInteriorOffset =  Math.round($beerWrapperInterior.offset().left - beerWrapperOffset);
    
    idealSpeed =  ($beerWrapperInteriorOffset / beerWidth) * beersPerSecond; // returns in ms    

    $beerWrapperInterior.animate({left:  0 }, idealSpeed, 'easeOutQuad'  )  // need to create a variable for this    

    $beer.removeClass('hoverable');
    
    console.log('animate left')
        
  }

  // what happens when you hover on the right side
  function animateRight() {
    
    animating = 1;
   
    $beerWrapperInteriorOffset =  Math.round($beerWrapperInterior.offset().left - beerWrapperOffset);
    
    idealSpeed =  ( (beerWrapperInteriorWidth - beerWrapperWidth + $beerWrapperInteriorOffset  ) / beerWidth) * -beersPerSecond; // returns in ms
      
    $beerWrapperInterior.animate({left: - (beerWrapperInteriorWidth - beerWrapperWidth) }, idealSpeed, 'easeOutQuad'   )  // need to create a variable for this    
        
    $beer.removeClass('hoverable');
      
    console.log('animate right')
    
    
  }
  
  // function to stop the animation
  function stopAnimation() {
    
    animating = 0;

    $beerWrapperInterior.stop();
    
    $beer.addClass('hoverable');
    
    console.log('stop the fucking animation')
    
  }


  // increase the size of the wrapper so we can handle exapanding the divs on hover
  // assuming only one 
  $('.hoverable').mouseover(function(){
  
    $beerWrapperInterior.css({width:beerWidth * $beer.length + 85 })
  
  });
  
  
  
  $('.hoverable').mouseout(function(){
  
    $beerWrapperInterior.css({width:beerWidth * $beer.length })
  
  });
 
 
 
 
 init();
 
 
 
 
 
 
 
 

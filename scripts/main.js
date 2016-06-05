// global variable declarations
var shapeSize = 6,
    tileColor = '',
    colorblindMode = false,
    faceSize = $('#difficulty-slider').val(),
    faceWidth = parseInt((100/faceSize)-2,10),
    tilePos = [],
    rCube = $('#cube');

// mouse rotation variables
var endX = 0,
	endY = 0,
	offsetX = 0,
	offsetY = 0;

$('#difficulty-slider').on('change mousemove', function () {
    $(this).on('change', function() {
        $(this).next().html($(this).val());
        faceSize = $(this).val();
        faceWidth = parseInt((100/faceSize)-2,10);
        newGame();
    });
});

$('#difficulty-value').html($('#difficulty-slider').val());


$('.colorblind').click(function(){
    if($(this).prop("checked") === true){
        colorblindMode = true;
        newGame();
    } else if($(this).prop("checked") === false) {
        colorblindMode = false;
        newGame();
    }
});

$('.select-text').click(function(){
    if($(this).prop("checked") === false){
        $('body').css('user-select','text');
    } else if($(this).prop("checked") === true) {
        $('body').css('user-select','none');
    }
});

function newGame() {
    
    // clear old cube
    $('#cube').html('');
    
    // construct the cube
    for (var i = 0; i < shapeSize; i++) {
        
        tilePos.push([]);
        
        // jquery DOM manipulation to create face div layer
        $("#cube").append("<div id=\"face" + i + "\"></div>");
        
        switch (i) {
            case 0:
                tileColor = "white";
                break;
            case 1:
                tileColor = "yellow";
                break;
            case 2:
                tileColor = "blue";
                break;
            case 3:
                tileColor = "red";
                break;
            case 4:
                tileColor = "orange";
                break;
            case 5:
                tileColor = "green";
                break;
        }
        
        // set-up the face to have specified faceSize^2
        for (var v = 0; v < Math.pow(faceSize, 2); v++) {
            // create array of color pallet
            tilePos[i].push(i);
            
            if(colorblindMode === true) {
                $("#face" + i).append("<div class=\"tile " + tileColor + "\">"+i+"</div>");
            } else {
                $("#face" + i).append("<div class=\"tile " + tileColor + "\"></div>");
            }
        }
    }
    $('.tile').css('width', faceWidth + '%');
}
newGame();

// mouse click/drag to rotate
$('.container').mousedown(function(event) {
	var startX = event.pageX,
		startY = event.pageY;
	$('.container').mousemove(function(event) {
		// get current mouse coords	& offsets
		endX = startX - event.pageX;
		endY = startY - event.pageY;
		
		// rotation calculations
        if(endY < 0) {
			offsetY += (endY/90);
        } else if(endY > 0) {
			offsetY += (endY/90);
		}
        
		if(endX > 0) {
			offsetX += (endX/90);
        } else if(endX < 0) {
			offsetX += (endX/90);
		}
        rCube.css('transform', 'rotateY(' + offsetX + 'deg) rotateX(' + offsetY + 'deg)');
		
	});
});

$(document).mouseup(function(){
    $('.container').unbind('mousemove');
});

// for setting active tiles
$('#cube').on('click','.tile',function() {
    if($(this).hasClass('active')) {
       $(this).removeClass('active');
    } else {
        $('.active').removeClass('active');
        $(this).addClass('active');
    }
});
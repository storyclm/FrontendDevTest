var fwd = false;
var timer = null;
var counter = 0;
var speed = 5;

function animate() {
	jsOpacityPlay();
	jsRotatePlay();
	jsScalePlay();
	jsTranslatePlay();
}

function reset(){
	jsOpacityReset();
	jsRotateReset();
	jsScaleReset();
	jsTranslateReset();
}
function jsOpacityPlay(){
	$('#js-opacity').animate({opacity:0}, 0);
}

function jsOpacityReset(){
	$('#js-opacity').animate({opacity:1}, 0);
}

function jsRotatePlay() {
	fwd = !fwd;

	clearInterval(timer);
	timer = setInterval(function () {
		if (fwd) {
			counter += speed;
		}

		if (counter > 360) {
			counter = 360;
			clearInterval(timer);
		}

		$("#js-rotate").css("transform", "rotate("+counter+"deg)");
	}, 0)
}

function jsRotateReset() {
	fwd = !fwd;

	clearInterval(timer);
	timer = setInterval(function () {
		if (!fwd) {
			counter -= speed;
		}

		if (counter < 0) {
		 counter = 0;
		 clearInterval(timer);
		 }

		$("#js-rotate").css("transform", "rotate("+counter+"deg)");
	}, 0)
}

function jsScalePlay(){
	setInterval(function(){
		$('#js-scale').css('transform', 'scale(1.5)')
	}, 10);
	/*$('#js-scale').addClass('activeScale');*/
}

function jsScaleReset(){
	setInterval(function(){
		$('#js-scale').css('transform', 'scale(1)')
	}, 10)
	/*$('#js-scale').removeClass('activeScale');*/
}

function jsTranslatePlay() {
	$('#js-translate.translate').css('position', 'relative');
	$('#js-translate').animate({'left':'50px', 'top':'50px'}, 0);
}

function jsTranslateReset() {
	$('#js-translate.activate').css('position', 'relative');
	$('#js-translate').animate({'left':'0', 'top':'0'}, 0);
}
var IsSwipeBlock = false;
function initSlide() {
    var next = $('meta[name="clm-swipe-next"]').attr("content");
    var previous = $('meta[name="clm-swipe-previous"]').attr("content");
    var swipeEl = document.body;
    var swObj = new Hammer(swipeEl);
    swObj.get('pan').set({
        threshold: 200,
        pointers: 1
    });
    swObj.on('panleft', function () {
        if (IsSwipeBlock == true) {
            return false;
        } else {
            if (IsSwipeBlock == false) {
                swObj.on('panend', function () {
                    window.location = next;
                });
            }
        }
    });
    swObj.on('panright', function () {
        if (IsSwipeBlock == true) {
            return false;
        } else {
            if (IsSwipeBlock == false) {
                swObj.on('panend', function () {
                    window.location = previous;
                });
            }
        }
    });
}
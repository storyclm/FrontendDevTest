var IsSwipeBlock = false;
function initSlide()
{
    var next = $('meta[name="clm-swipe-next"]').attr("content");
    var previous = $('meta[name="clm-swipe-previous"]').attr("content");
    $("body *").touchwipe({
        wipeRight: function () {
            if (IsSwipeBlock) return false;
            if (previous != "")
                window.location = previous;
            return false;
        },
        wipeLeft: function () {
            if (IsSwipeBlock) return false;
            if (next != "")
                window.location = next;
            return false;
        },
        min_move_x: 200,
        min_move_y: 200,
        preventDefaultEvents: true
    });
}

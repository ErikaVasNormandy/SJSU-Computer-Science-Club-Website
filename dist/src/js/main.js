/*=================================================================================
Regular JS
=================================================================================*/

$("#scrolltotop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
});

var offset = $("#tabsnav").offset().top;

window.onscroll = function () {
    if ($(window).scrollTop() >= offset)
        $("#tabsnav").css({"position": "fixed", "top": "0", "left": "0", "z-index": "2", "width": "72%", "margin-left": "14%"});
    else
        $("#tabsnav").removeAttr("style");
};

/*=================================================================================
Canvas Background Stuff
=================================================================================*/

var animate = true;
var canvas = document.getElementById('draw');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H+300;

var colors = [{
    r: 242, g: 231, b: 82
}, {
    r: 90, g: 26, b: 122
}, {
    r: 227, g: 205, b: 59
}, {
    r: 244, g: 240, b: 38
},{
    r: 240, g: 219, b: 79
}, {
    r: 66, g: 26, b: 122
}, {
    r: 103, g: 0, b: 255
}, {
    r: 90, g: 10, b: 255
}, {
    r: 177, g: 122, b: 230
}, {
    r: 240, g: 209, b: 108
}];

window.requestAnimFrame = function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(c) {
            window.setTimeout(c, 1000 / 60);
        }
    );
}();

var squares = [];
var lastRender = Date.now();
var lastCreate = Date.now();

function render() {
    if(animate)
    {
        var timeDelta = new Date().getTime() - lastRender;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (Date.now() - lastCreate >= 112) {
            var sze = randr(20, 50);
            var color = colors[Math.floor(Math.random() * colors.length)];
            squares.push({
                width: sze,
                height: sze,
                vel: randr(50, 100), //pixs per second
                x: randr(-sze + 10, canvas.width - 10),
                y: randr(10, canvas.height - 10),
                age: 1,
                r: color.r,
                g: color.g,
                b: color.b
            });
            lastCreate = Date.now();
        }
        for (var i = 0; i < squares.length; i++) {
            var sq = squares[i];
            ctx.fillStyle = ["rgba(", sq.r, ", ", sq.g, ", ", sq.b, ",", (sq.age / 600), ")"].join("");
            ctx.fillRect(sq.x, sq.y, sq.width, sq.height);
            sq.y -= sq.vel / 1000 * timeDelta;
            sq.age++;
            if (sq.y + sq.height < 0) {
                squares.splice(i, 1);
                i--;
            }
        }
        lastRender = new Date().getTime();
    }
}

function randr(min, max) {
    return Math.random() * (max - min) + min;
}

function resize() {
    var he = window.innerHeight;
    var wi = window.innerWidth;
    canvas.height = he+300;
    canvas.width = wi;
    if (window.devicePixelRatio == 2) {
        canvas.width = wi * 2;
        canvas.height = (he+300) * 2;
        canvas.style.height = he+300;
        canvas.style.width = wi;
        ctx.scale(2, 2);
    }
    if(wi < 975)
    {
        canvas.height = 0;
        canvas.width = 0;
    }
}

window.onresize = resize;
resize();

function toggleanim()
{
    animate = !animate;
    lastRender = new Date().getTime();
}

(function loop() {
    requestAnimFrame(loop);
    render();
})();

var canvas, context, canvasImage, settings;
var bmouseDown = false;
var cursorPosition = {
    x: undefined,
    y: undefined,
};
var color = '#e5e5e5';
var size = 30;


function throttle(ms, fn) {
    var lastCallTime;
    return function () {
        var now = Date.now();
        if (!lastCallTime || now - lastCallTime > ms) {
            lastCallTime = now;
            fn.apply(this, arguments);
        }
    }
}

function drawCircle(event) {
    var img = document.getElementById("scream");
    context.drawImage(img, 10, 10);
}


window.onload = function () {
    canvas = document.getElementById("cvs");
    img1 = document.getElementById("img1");
    img2 = document.getElementById("img2");
    img3 = document.getElementById("img3");
    img4 = document.getElementById("img4");
    img5 = document.getElementById("img5");
    img6 = document.getElementById("img6");
    big_section = document.getElementById("big-section");
    span = document.getElementsByClassName("close")[0];
    modal = document.getElementById('myModal');
    canvasImage = img1;
    settings = document.getElementById("settings");
    console.log(canvas.height);
    canvas.width = big_section.offsetWidth;
    canvas.height = big_section.offsetHeight;
    console.log(canvas.height);
    context = canvas.getContext('2d');
    downloadFile = document.getElementById('download');
    sendToSpace = document.getElementById('send2space');

    downloadFile.onclick = function (e) {
        var type = 'png',
            w = canvas.width,
            h = canvas.height;
        Canvas2Image.saveAsImage(canvas, w, h, 'png', fileName = 'outerspace-artist');
    }


    $("#send2space").click(function () {
        console.log('enter modal');
        var type = 'png',
            w = canvas.width,
            h = canvas.height;
        var converted = Canvas2Image.convertToImage(canvas, w, h, 'png');
        console.log(converted.src);
        var myimg = converted.src;
        var requestbody = JSON.stringify({data: myimg});
        $.ajax({
            method: 'POST',
            url: '/saveimgLocal',
            contentType: 'application/json;charset=UTF-8',
            data:requestbody
          }).done(function() {
            $('#myModal').modal('show')
          });


    });


    clear.onclick = function () {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    img1.onclick = function () {
        canvasImage = document.getElementById("img1")
    }

    img2.onclick = function () {
        canvasImage = document.getElementById("img2")
    }

    img3.onclick = function () {
        canvasImage = document.getElementById("img3")
    }

    img4.onclick = function () {
        canvasImage = document.getElementById("img4")
    }
    img5.onclick = function () {
        canvasImage = document.getElementById("img5")
    }
    img6.onclick = function () {
        canvasImage = document.getElementById("img6")
    }
    window.onresize = throttle(100, function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        canvasImage && context.putImageData(canvasImage, 0, 0);
    });
    canvas.onclick = function (e) {
        bmouseDown = !bmouseDown;
    };

    canvas.onmousemove = throttle(10, function (event) {
        if (bmouseDown) {
            cursorPosition = {
                x: event.clientX - canvas.offsetLeft +
                    (window.pageXOffset ||
                        document.body.scrollLeft ||
                        document.documentElement.scrollLeft),
                y: event.clientY -
                    canvas.offsetTop +
                    (window.pageYOffset ||
                        document.body.scrollTop ||
                        document.documentElement.scrollTop),
            };

            context.drawImage(canvasImage, cursorPosition.x, cursorPosition.y, 32, 32);
        }
    });

    window.ontouchmove = throttle(10, function (event) {
        cursorPosition = {
            x: event.touches[0].clientX - canvas.offsetLeft +
                (window.pageXOffset ||
                    document.body.scrollLeft ||
                    document.documentElement.scrollLeft) - 10,
            y: event.touches[0].clientY -
                canvas.offsetTop +
                (window.pageYOffset ||
                    document.body.scrollTop ||
                    document.documentElement.scrollTop) - 30,
        };
        context.drawImage(canvasImage, cursorPosition.x, cursorPosition.y, 32, 32);
    });
}

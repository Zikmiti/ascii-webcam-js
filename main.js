var video = document.querySelector("#videoElement"),
    canvas_web = document.querySelector('canvas'),
    text = document.getElementById("text"),
    slider = document.getElementById("myRange"),
    output = document.getElementById("demo");


slider.oninput = function() {
   text.style.fontSize = this.value+'px';
   text.style.lineHeight = this.value+'px';
}


if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })

    .then(function (stream) {

        video.srcObject = stream;


        //send image every 30ms
        setInterval((e) => {
            canvas_web.getContext('2d').drawImage(video, 0, 0, 640, 480);
            printAscii(canvas_web)
            
        }, 60); // <--
        
        console.log(video)
    })
    
    .catch(function (err0r) {
      console.log("Something went wrong => " + err0r);
    });
}



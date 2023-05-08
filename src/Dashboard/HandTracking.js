import React, { useEffect, useRef} from "react";
import * as handTrack from "handtrackjs";

function HandTracking() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let model = null;
  useEffect(() => {
	let predict = true;
    const modelParams = {
      flipHorizontal: false,
      maxNumBoxes: 2,
      iouThreshold: 0.5,
      scoreThreshold: 0.6,
    };
    handTrack.load(modelParams).then((lmodel) => {
      model = lmodel;
      startVideo();
    });	
    function startVideo() {
      let All_mediaDevices = navigator.mediaDevices;
      if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
        console.log("getUserMedia() not supported.");
      }
      All_mediaDevices.getUserMedia({ audio: false, video: true }).then(
        function (vidStream) {
          if ("srcObject" in videoRef.current) {
            videoRef.current.srcObject = vidStream;
          } else {
            videoRef.current.src = window.URL.createObjectURL(vidStream);
          }
          videoRef.current.onloadedmetadata = function (e) {
            videoRef.current.play();
            runDetection();
          };
        }
      ).catch(function (e) {
        console.log(e.name + ": " + e.message);
      });
    }
	
	function speech(arg0){
		let speech = new SpeechSynthesisUtterance();
		speech.lang = "en";
		speech.text = arg0;
		window.speechSynthesis.speak(speech);
	}
	
	function AIpredict(arg0, canvas, video) {
		var index = arg0.findIndex(function(item, i){
			return (item.label === "closed" || item.label === "point");
		});
		try {
			if(arg0[index]){
			  predict = false;
			  canvas.getContext('2d').drawImage(video, arg0[index]["bbox"][0]+10,arg0[index]["bbox"][3],480,500,0, 0,480,280);
			  canvas.style.display = 'none';
			  const xhttp = new XMLHttpRequest();
			  xhttp.onload = function() {
				  if(JSON.parse(this.responseText).result === true){
					  speech(JSON.parse(this.responseText).content);
					  predict = true;
				  }
			  }
			  xhttp.open("POST", "http://127.0.0.1:5000/api/predict", true);
			  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
			  xhttp.send("img="+canvas.toDataURL('image/jpeg'));
			}
		} catch(err){alert(err);}
	}	
    function runDetection() {
      model.detect(videoRef.current).then((predictions) => {
        model.renderPredictions(
          predictions,
          canvasRef.current,
          canvasRef.current.getContext("2d"),
          videoRef.current
        );
		if(predict === true){
			AIpredict(predictions, document.getElementById('canvas1'), document.getElementById('stream'));
			//alert(document.getElementById("stream").paused);
		}
        if (videoRef.current) {
          setTimeout(() => {
            runDetection();
          }, 400);
        }
      });
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }} >
        <video
          id="stream"
          width="480px"
          height="270px"
          autoPlay
          style={{ display: "none" }}
          ref={videoRef}
        ></video>
        <canvas
          id="canvas"
          width="480px"
          height="270px"
          ref={canvasRef}
		  style={{marginLeft:"auto", marginRight:"auto", marginTop:"20px"}}
        ></canvas>
		<canvas
          id="canvas1"
		  style={{display:"none"}}
        ></canvas>
		
      </div>
    </>
  );
}

export default HandTracking;

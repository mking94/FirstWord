import React, {useState, useEffect} from "react";
import "./styles.css";

function Rate({id}) {
   const [prev, setPrev] = useState(null);
   const [numlike, setNumlike] = useState(0);
   const [numdislike, setNumdislike] = useState(0);
   const rateAction = () => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {
		  setNumlike(JSON.parse(this.responseText).like);
		  setNumdislike(JSON.parse(this.responseText).dislike)
		};
	  xhttp.open("POST", "http://127.0.0.1:5000/api/rate", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send("idModel="+id+"&&like="+Number(document.querySelector('input[name="rate"]:checked').value === "like") + "&&dislike="+Number(document.querySelector('input[name="rate"]:checked').value === "dislike"));
   }
   const toggleLike = () => {
   const aux = document.querySelector('input[name="rate"]:checked').value;
    if (aux === "like" && prev === null) {
      document.getElementById("iconL").classList.toggle("fa-thumbs-up");
	  rateAction();
    }
    if (aux === "like" && prev === "dislike") {
      document.getElementById("iconL").classList.toggle("fa-thumbs-up");
      document.getElementById("iconD").classList.toggle("fa-thumbs-down");
	  rateAction();
    }
    if (aux === "dislike" && prev === null) {
      document.getElementById("iconD").classList.toggle("fa-thumbs-down");
	  rateAction();
    }
    if (aux === "dislike" && prev === "like") {
      document.getElementById("iconL").classList.toggle("fa-thumbs-up");
      document.getElementById("iconD").classList.toggle("fa-thumbs-down");
	  rateAction();
    }
	setPrev(aux);
   }
   useEffect(() => {
	  const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {
		  if (JSON.parse(this.responseText).result === true){
			  setNumlike(JSON.parse(this.responseText).like);
			  setNumdislike(JSON.parse(this.responseText).dislike)
			  if (JSON.parse(this.responseText).content === 'like') {
				  document.getElementById("like").checked = true;
				  document.getElementById("iconL").classList.toggle("fa-thumbs-up");
				  setPrev('like');
			  }
			  else if (JSON.parse(this.responseText).content === 'dislike') {
				  document.getElementById("dislike").checked = true;
				  document.getElementById("iconD").classList.toggle("fa-thumbs-down");
				  setPrev('dislike');
			  }
		  }
		};
	  xhttp.open("POST", "http://127.0.0.1:5000/api/getRate", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send("idModel="+id);
   }, []);
	return (
		   <div className="rate" id={id}>
		     <input type="radio" name="rate" className="hide" value="like" onClick={toggleLike} id="like"/>
			 <label for="like" className="label">
				<i className="fa fa-thumbs-o-up" id="iconL"></i>{numlike}
			 </label>
			 <input type="radio" name="rate" className="hide" value="dislike" onClick={toggleLike} id="dislike"/>
			 <label for="dislike" className="label">
				<i className="fa fa-thumbs-o-down" id="iconD"></i>{numdislike}
			 </label>
		   </div>
		);
}
export default Rate;	   
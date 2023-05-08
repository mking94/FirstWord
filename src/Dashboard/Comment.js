import React, {useEffect} from "react";
import "./styles.css";

function Comment({id}) {
	 const strToObj = (str) => 
	  {
		return eval('('+str+')');
      }
	 const ObjectId = (id) =>
	  {
	    return ""+id;
	  }
	 useEffect(() => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {
		  let data = JSON.parse(this.responseText);
		  const view = document.getElementById("commentview");
		  data = strToObj(data["content"]);
		  var feedback = data[0]["feedback"];
		  for (let i = 0; i < feedback.length; i++){
			   const zone = document.createElement("div");
			   const fname = document.createElement("h6");
			   const comment = document.createElement("p");
			   const newline = document.createElement("br");
			   fname.innerHTML = feedback[i]["fullname"] + ' :';
			   comment.innerHTML = feedback[i]["comment"];
			   zone.appendChild(fname);
			   zone.appendChild(comment);
			   view.appendChild(zone);
			   view.appendChild(newline);
			  }
		  }
	  xhttp.open("POST", "http://127.0.0.1:5000/api/getfeedback", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send("idModel="+id);
    }, []);
	return (	 
	 <div id="commentview">
	 </div>
	);
}
export default Comment;
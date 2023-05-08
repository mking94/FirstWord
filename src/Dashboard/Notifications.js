import React, {useEffect} from "react";
import "./styles.css";


function Notifications() {
   const ObjectId = (id) =>
   {
	   return ""+id;
   }
   const strToObj = (str) => 
   {
		return eval('('+str+')');
   }
   useEffect(() => {
	   try{
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {
	    let data = strToObj(this.responseText);
		if (data["result"] === true) {
		  let notify = data['content'];
		  notify = strToObj(data['content']);
		  const view = document.getElementById("notf");
		  for (let i = notify.length - 1 ; i >= 0 ; i--) {
			  const zone = document.createElement("div");
			  const dt = document.createElement("h5");
			  dt.innerHTML = notify[i]['time']
			  zone.innerHTML = notify[i]['notify'];
			  zone.appendChild(dt);
			  view.appendChild(zone);
		  }
		}
	  };
	  xhttp.open("POST", "http://127.0.0.1:5000/api/getnotification", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send();
	   } catch(err){alert(err);}
    }, []);
	
	return (
	  <div className="notifications" id="notf">
	  </div>
	);
}
export default Notifications;
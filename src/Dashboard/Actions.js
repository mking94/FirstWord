import React, {useEffect, useState} from "react";
import "./styles.css";
import Comment from './Comment';
import ReactDOM from 'react-dom';
const Swal = require('sweetalert2');

function Actions({id}) {
   const [isMyModel, setIsMyModel] = useState(false);
   
   const virtualview = () => {
     const newview = document.createElement("div");
     ReactDOM.render(<Comment id={id} />, newview);
     return newview.innerHTML;
   }
   
   const feedback = () => {
	  const aux = virtualview();
	  Swal.fire({
		title: 'Feedback',
		html: aux + '<input type="text" id="comment" placeholder="Comment..." />',
		confirmButtonText: 'Comment',
		showConfirmButton: true,
		showCancelButton: false,
		showCloseButton: true,
		}).then((result) => {
		  if (result.isConfirmed) {
			if(document.getElementById("comment").value.length < 8){
			  Swal.fire(
				'Be careful!',
				'The comment must have more then 8 characters',
				'warning'
			  );
			}
			else{
			const xhttps = new XMLHttpRequest();
			xhttps.onload = function() { 
			  Swal.fire(
				'Good job!',
				'Your feedback has been successfully sent',
				'success'
			  );
			};
			xhttps.open("POST", "http://127.0.0.1:5000/api/addfeedback", true);
			xhttps.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
			xhttps.send("idModel="+id+"&&comment="+document.getElementById("comment").value);
			}
		 }
	  }) 
   }
   const deletemodel = () => {
	 const xhttps = new XMLHttpRequest();
	 xhttps.onload = function() {
		 if(JSON.parse(this.responseText).result === true){
			Swal.fire(
			  'Good job!',
			  'Your has deleted',
			  'success'
			);
		 }
	 }
	 xhttps.open("POST", "http://127.0.0.1:5000/api/deletemodel", true);
	 xhttps.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	 xhttps.send("idModel="+id);
   }
   useEffect(() => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {setIsMyModel(JSON.parse(this.responseText).result) };
	  xhttp.open("POST", "http://127.0.0.1:5000/api/ismymodel", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send();
    }, []);
	
	return (
	  <div className="acts">
		<h6 style={isMyModel ? { display: 'block',color: "#ff0000", cursor:"pointer"} : { display: 'none' }} onClick={deletemodel}><i className="fa fa-trash-o"  style={{fontSize:"18px", marginRight:"5px"}}></i>Delete</h6>
		<h6 style={{color:"blue", cursor:"pointer"}} onClick = {feedback}><i className="fa fa-comments-o" style={{fontSize:"18px", marginRight:"5px"}}></i>Feedback</h6>
	  </div>
	);
}
export default Actions;
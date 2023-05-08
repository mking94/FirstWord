import React from "react";
import "./Verify.css";
import logo from '../assets/logo.png';
import Captcha from "./Captcha";
const Swal = require('sweetalert2');

function Verify() {
   const handleVerfy = (event) => {
    event.preventDefault();
    if (isNaN(document.getElementById("code").value) || document.getElementById("code").value.length !== 6) {
	 Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text: 'The code must be 6 numbers',
	 });
	 return false;
   }
   else if (document.getElementById("captchaInput").value !== document.getElementById("capt").innerText){
	 Swal.fire({
		icon: 'warning',
		title: 'Be careful!',
		text: 'Please check the captcha',
	 });
	 return false;	  
   }   
   else {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if(JSON.parse(this.responseText).result){
			window.location.href = "/dashboard";
		}
		else {
		  Swal.fire({
		   icon: 'error',
		   title: 'Oops...',
		   text: 'Please check the code',
	      });
		}
		}
	xhttp.open("POST", "http://127.0.0.1:5000/api/verify", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhttp.send("code="+document.getElementById("code").value); 
   }
   }
   
  return (
   <div className="pagelogin">
    <div className="content" style={{width: 'fit-content'}}>
		<img id="logo" alt="logo" src={logo}/>
		<h2>Confirm you're not a robot</h2>
		<h6 style={{textAlign:'center'}}>Get a verification code sent to your Email</h6><br/>
		<form method="post" onSubmit={handleVerfy}> 
			<input type="text" id="code" placeholder="Your code" maxLength="6"/>
			<Captcha />
			<input type="submit" className="button" value="Verify"/>
		</form>
	</div>
   </div>
  );
}

export default Verify;
import React from "react";
import "./Forgot.css";
import logo from '../assets/logo.png'
import validator from 'validator';
import Captcha from "./Captcha";
import emailjs from '@emailjs/browser';
const Swal = require('sweetalert2');

function Forgot() {
   const handleSend = (event) => {
    event.preventDefault();
    if (!validator.isEmail(document.getElementById("email").value)) {
	 Swal.fire({
		icon: 'warning',
		title: 'Be careful!',
		text: 'Plese check your Email',
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
		if(JSON.parse(this.responseText).result === true){
			emailjs.send("service_243yn8k","template_fy2z4xv",{
			    user_email: JSON.parse(this.responseText).email,
			    message: JSON.parse(this.responseText).new_password},"MAQ33JcDcBvxpFngh").then(
				(result) => {
					Swal.fire({
						icon: 'success',
						title: 'Good',
						text: 'Your new password was sent successfully',
						confirmButtonText: 'OK',
						showCancelButton: false,
						showCloseButton: true
						}).then((result) => {
							if (result.isConfirmed) {
								window.location.href = "/login";
							}
						})
				},
			(error) => {
				alert(error.text);
			});
		}
		else {
		  Swal.fire({
		   icon: 'error',
		   title: 'Oops...',
		   text: 'No account exist for this Email',
	      });
		}
		}
	xhttp.open("POST", "http://127.0.0.1:5000/api/forgot", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhttp.send("email="+document.getElementById("email").value); 
   }
   }

  return (
   <div className="pagelogin">
    <div className="content" style={{width: 'fit-content'}}>
		<img id="logo" alt="logo" src={logo}/>
		<h2 style={{textAlign:'center'}}>Forgot Password</h2>
		<h6 style={{textAlign:'center'}}>Please enter your Email and we'll send you a new password</h6><br/>
		<form method="post" onSubmit={handleSend}> 
			<input type="text" id="email" placeholder="Your Email"/>
			<Captcha />
			<input type="submit" className="button" value="Send"/>
		</form>
	</div>
   </div>
  );
}

export default Forgot;
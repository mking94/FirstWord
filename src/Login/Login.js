import React from "react";
import "./Login.css";
import logo from '../assets/logo.png'
import Captcha from "./Captcha";
import validator from 'validator';

const Swal = require('sweetalert2');
var md5 = require('md5');
function Login() {
   const handleLogin = (event) => {
    event.preventDefault();
    if (!validator.isEmail(document.getElementById("email").value)) {
	 Swal.fire({
		icon: 'warning',
		title: 'Be careful!',
		text: 'Please check your Email',
	 });
	 return false;
   }
   else if (document.getElementById("password").value.length < 8) {
	 Swal.fire({
		icon: 'warning',
		title: 'Be careful!',
		text: 'Please check your password',
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
			window.location.href = "/verify";
		}
		else {
		  Swal.fire({
		   icon: 'error',
		   title: 'Oops...',
		   text: 'Invalid Email or password',
	      });
		}
		}
	xhttp.open("POST", "http://127.0.0.1:5000/api/login", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhttp.send("email="+document.getElementById("email").value+"&&password="+md5(document.getElementById("password").value)); 
   }
   }
  return (
   <div className="pagelogin">
    <div className="content">
		<img id="logo" alt="logo" src={logo}/>
		<h1>Login</h1>
		<form method="post" onSubmit={handleLogin}>
			<label for="email">Email</label>
			<input type="text" id="email" placeholder="Enter your Email" />
			<label for="password">Password</label>
			<input type="password" id="password" placeholder="Enter your password" />
			<label> <a href="/forgot" style={{color: "rgba(187, 187, 187, 1)", textDecoration: "none"}}><b>Forgot Password?</b></a> </label>
			<Captcha />
			<input type="submit" className="button" value="Login"/>
			<label style={{marginTop: "5px"}}> Not a member? <a href="/signup" style={{textDecoration: "none"}}><b>Signup</b></a> </label>
		</form>
	</div><br/>
   </div>
  );
}

export default Login;
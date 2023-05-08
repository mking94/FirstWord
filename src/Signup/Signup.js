import React, {useState} from "react";
import "./Signup.css";
import logo from '../assets/logo.png'
import Captcha from "./Captcha";
import PasswordChecklist from "react-password-checklist";
import validator from 'validator';
import emailjs from '@emailjs/browser';
const Swal = require('sweetalert2');
var md5 = require('md5');

function Signup() {
	const [validPassword, setValidPassword ] = useState(false);
    const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const handleSignup = (event) => {
		event.preventDefault();
		if(document.getElementById("fname").value.length < 8){
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Please check your Name',
			});
		}
		else if (!validator.isEmail(document.getElementById("email").value)) {
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Please check your Email',
			});
			return false;			
		}
		else if (validPassword === false) {
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Passwords not match or not strength',
			});
			return false;			
		}
		else if (!(document.getElementById("rad1").checked || document.getElementById("rad2").checked)) {
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Please check account type',
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
				    emailjs.send("service_9cvfidn","template_lbzbcxo",{
				    user_email: JSON.parse(this.responseText).email,
				    message: JSON.parse(this.responseText).verify_code},"yZQJ0JAfakG-iT-os").then(
					(result) => {
						window.location.href = "/verify";
						},
					(error) => {
						alert(error.text);
						});
				}
				else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Email is currently used by another user',
					});
				}
		}
	xhttp.open("POST", "http://127.0.0.1:5000/api/signup", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhttp.send("fname="+document.getElementById("fname").value+"&&email="+document.getElementById("email").value+"&&password="+md5(document.getElementById("password").value)+"&&type="+document.querySelector('input[name = type]:checked').value); 
		}
	}	
  return (
   <div className="page">
    <div className="content">
		<img id="logo" alt="logo" src={logo}/>
		<h1>Signup</h1>
		<form method="post" onSubmit={handleSignup}>
			<label for="fname">Full Name</label>
			<input type="text" id="fname" placeholder="Full Name" />
			<label for="email">Email</label>
			<input type="text" id="email" placeholder="Enter your Email" />
			<label for="password">Password</label>
			<input type="password" id="password"  placeholder="Enter your password" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={e => setPassword(e.target.value)} />
			<input type="password" placeholder="Confirm password" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={e => setPasswordAgain(e.target.value)} />
			<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				className="PasswordChecker"
				style={isFocused ? { display: 'block' } : { display: 'none' }}
				valueAgain={passwordAgain}
				onChange={(isValid) => {setValidPassword(isValid);}}
			/> 
			<label >Account Type</label>
			<div class="wrap">
			  <input type="radio" value="user" id="rad1" name="type" />
			  <label for="rad1" className="lab"> User </label>
			  <input type="radio" value="developer" id="rad2" name="type" />
              <label for="rad2" className="lab"> Developer </label>
			</div>
			<Captcha />
			<input type="submit" className="button" value="Signup"/>
			<label style={{marginTop: "5px"}}> Already have an account? <a href="/login" style={{textDecoration: "none"}}><b style={{marginLeft:"22%"}}>Login here</b></a> </label>
		</form>
	</div>
   </div>
  );
}

export default Signup;
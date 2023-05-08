import React,{useState, useEffect} from "react";
import "./styles.css";
import PasswordChecklist from "react-password-checklist";
import Button from "react-bootstrap/Button";
const Swal = require('sweetalert2');

function Settingspage() {
    const [isFocused, setIsFocused] = useState(false);
	const [validPassword, setValidPassword ] = useState(false);
	const [passwordAgain, setPasswordAgain] = useState("");
	const [password, setPassword] = useState("");
	const changepsw = () => {
		if (document.getElementById("act_psw").value.length < 8) {
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Please check your actual password',
			});
		}
		else if (validPassword === false) {
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Passwords not match or not strength',
			});		
		}
		else {
			const xhttp = new XMLHttpRequest();
			xhttp.onload = function() {
				if(JSON.parse(this.responseText).result === true){
					Swal.fire({
						icon: 'success',
						title: 'Good job!',
						text: 'Your password changed successfully',
					});
				}
				else {
					Swal.fire({
						icon: 'error',
						title: 'Oops!',
						text: 'Invalid actual password',
					});
				}
			}
			xhttp.open("POST", "http://127.0.0.1:5000/api/checkpsd", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
			xhttp.send("psd="+document.getElementById("act_psw").value+"&&newps="+document.getElementById("password").value);
		}
	}
	useEffect(() => {
		document.onkeydown = function (e) {
			let keyCode = e.keyCode;
			let activeElement = document.activeElement;
			let elements = [document.getElementById('act_psw'),document.getElementById('password'),document.getElementById('cpsd')];
			if(keyCode === 13 && elements.includes(activeElement)) {
				changepsw();
			}
		};
	}, [])
	return (
	  <div className="settings">
	   <details>
	     <summary>Password and security</summary>
		 <h4> Change password </h4>
		 <input type="password" placeholder="Actual password" id="act_psw"/>
		 <input type="password" id="password"  placeholder="Enter your password" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={e => setPassword(e.target.value)} />
		 <input type="password" placeholder="Confirm password" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={e => setPasswordAgain(e.target.value)} />
			<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				className="PasswordChecker"
				style={isFocused ? { display: 'block' } : { display: 'none' }}
				valueAgain={passwordAgain}
				onChange={(isValid) => {setValidPassword(isValid);}} />
		  <Button onClick={changepsw} variant="primary" id="btn">SUBMIT</Button>
	   </details>
	  </div>
	);
}
export default Settingspage;
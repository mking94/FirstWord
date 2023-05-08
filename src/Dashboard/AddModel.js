import React,{useEffect, useState} from "react";
import "./styles.css";
import Button from "react-bootstrap/Button";
import FileBase from 'react-file-base64';
const Swal = require('sweetalert2');

function AddModel() {
	const [file, setFile] = useState('');
    const handleFileUpload = (base64EncodedFile) => {
      setFile(base64EncodedFile);
    };
	const isJson = (str) => {
		try{
			JSON.parse(str);
		} catch(e){
			return false;
		}
		return true;
	}
	const upload = () => {
		if(document.getElementById('description').value.length < 8 ){
			Swal.fire({
				icon: 'warning',
				title: 'Be careful!',
				text: 'Check your description',
			});
		}
		else if(isJson(document.getElementById('target').value) && file.length > 0){
			const xhttp = new XMLHttpRequest();
			xhttp.onload = function() {
				if(JSON.parse(this.responseText).result === true){
					Swal.fire({
						icon: 'success',
						title: 'Good job!',
						text: 'Your AI Model uploaded successfully',
					});
				}
			}
			xhttp.open("POST", "http://127.0.0.1:5000/api/upload", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
			xhttp.send("description="+document.getElementById('description').value+"&&target="+document.getElementById('target').value+"&&file="+file);
		}
		else {
			Swal.fire({
				icon: 'error',
				title: 'Oops!',
				text: 'Check your model target or your file',
			});
		}
	}
	useEffect(() => {
		document.onkeydown = function (e) {
			let keyCode = e.keyCode;
			let activeElement = document.activeElement;
			let elements = [document.getElementById('description'), document.getElementById('target'), document.getElementById('fileb'), document.getElementById('btn')];
			if(keyCode == 13 && elements.includes(activeElement)) {
				upload();
			}
		};
	}, []);
	
	return (
	 <div className="addmodel">
	   <textarea placeholder="Description" id="description"></textarea>
	   <textarea placeholder="Target" id="target"></textarea>
	   <FileBase
	    id="fileb"
        type="file"
        multiple={false}
        onDone={({ base64 }) => handleFileUpload(base64)}
      />
	  <Button onClick={upload} variant="primary" id="btn">SUBMIT</Button>
	 </div>
	);
}
export default AddModel;

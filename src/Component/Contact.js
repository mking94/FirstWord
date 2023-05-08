import React from "react";
import "./Contact.css";
import validator from 'validator';
import emailjs from '@emailjs/browser';
import "bootstrap/dist/css/bootstrap.min.css";

const Swal = require('sweetalert2');
const Title = () => {
  return <div id="contact-title"><h1>CONTACT</h1></div>;
};

  
function Contact() {
 
 const handleSubmit = (event) => {
    event.preventDefault();
    if (document.getElementById("name").value.length < 8 || !/^[a-zA-Z," "]+$/.test(document.getElementById("name").value)) {
	 Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text: 'Please check your name',
	 });
	 return false;
 }
 else if(!validator.isEmail(document.getElementById("email").value)) {
	 Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text: 'Please check your Email',
	 });
	 return false;
 }
 else if(document.getElementById("message").value.length < 10) {
	 Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text: 'Please write a good message',
	 });
	 return false;
 }
 else {
 try{
	 
	emailjs.send("service_9cvfidn","template_mmv84td",{
		user_name: document.getElementById("name").value,
		user_email: document.getElementById("email").value,
		message: document.getElementById("message").value,
	},"yZQJ0JAfakG-iT-os").then(
        (result) => {
         Swal.fire({
		  icon: 'success',
		  title: 'Good!',
		  text: 'Your message was sent successfully',
	    });
        },
        (error) => {
          alert(error.text);
        });
	  
 }catch(err){alert(err);}

  }
}
  return (
    <section className="concat-section" id="contact">
	  <Title />
	  <h5>We're open for suggestion or just to have a chat.</h5>
	  <div className="container" >
	   <div className="row resp">
	    <div className="col-md" id="data">
		<span><i className='fa fa-phone border'></i> +21626581589</span>
		<span><i className='fa fa-envelope border' style={{fontSize:"20px"}}></i> dadimaher94@gmail.com</span>
		<span><i className='fa fa-map-marker border' style={{paddingLeft:"9px"}}></i> Rue Biwa, Lac, Tunisia</span>
	    </div>
	    <div className="col-md contact" style={{background:"#00d9ff", borderRadius:"10px"}}> 
		 <form method="post" onSubmit={handleSubmit}>
		   <input style={{border:"1px solid black;"}}type="text" id="name" name="user_name" placeholder="&#xf2bd; FULL NAME"/>
		   <input type="text" id="email" name="user_email" placeholder="&#xf0e0; EMAIL"/>
		   <textarea id="message" name="message" placeholder="MESSAGE"></textarea>
		   <input type="submit" value="SEND"/>
		  </form>
		</div>
	   </div>
	  </div>
    </section>
  );
}

export default Contact;

import React from "react";
import "./Footer.css";
import holbertonlogo from '../assets/holberton-logo.png'
import "bootstrap/dist/css/bootstrap.min.css";

const getYear = () => {
  return new Date().getFullYear();
};

function Footer() {
  return (
    <footer className="site-footer" >
	  <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
          </div>
        </div>
         <p className="text">Powred by <b>Maher Ben Dada</b></p>
         <p className="text">Associated with <a href="https://www.holbertonschool.com"><img src={holbertonlogo} alt="holberton-logo"/></a></p>
        <hr />
       <div className="container">
        <div className="row" id="end">
          <div className="col-md" >
		    <br/>
            <p className="copyright-text">Copyright &copy; {getYear()} All Rights Reserved </p>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 center">
            <ul className="social-icons">
			  <br  className="nl"/>
              <li><a className="github" href="https://github.com/mking94" ><i className="fa fa-github" ></i></a></li>  
            </ul>
          </div>
         </div>
       </div>  
     </div>
    </footer>
  );
}

export default Footer;

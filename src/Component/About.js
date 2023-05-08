import React from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TypeIt from "typeit-react";
import logo from '../assets/logo.gif'
const Title = () => {
  return <div id="title_about"><h1>ABOUT</h1></div>;
};

function About() {
  return (
  
    <div className="container" id="about">
	 <Title/>
      <div className="row">
        <div className="col-md" style={{ textAlign: "justify" }}>
          <TypeIt id="text">
            FirstWord is a cutting-edge educational platform that leverages the
            power of artificial intelligence (AI) to assist children in
            identifying objects in their environment. The platform utilizes one
            of the deep learning models to analyze images captured by a
            smartphone camera or other camera, and then identifies and labels
            the objects in the child's vicinity. Furthermore, when a child holds
            an object in their hand, the platform pronounces the name of the
            object out loud. This innovative and interactive approach not only
            engages children in the learning process but also helps them develop
            their cognitive and language skills. With FirstWord, children can
            learn about their environment in a fun and engaging way.
          </TypeIt>
        </div>
        <div className="col-md">
		  <img src={logo} id="img" alt="logo"/>
		</div>
      </div>
    </div>
  );
}

export default About;

import React from "react";
import "./Team.css";


const Title = () => {
  return <div id="title"><h1>TEAM</h1></div>;
};

function Team() {
  return (
    <div className="back_team" id="team">
	  <Title/>
	  <img id="myPic" alt="myPic" src="https://raw.githubusercontent.com/mking94/Louagi/main/static/images/mypic.jpg"/>
	  <h3 style={{color:"white", textAlign:"center"}}>Maher Ben Dada</h3>
	  <h4 style={{color:"white", textAlign:"center"}}>Full Stack Developer</h4>
	  <a className="facebook" href="https://www.facebook.com/dadi.maher94"><i className="fa fa-facebook" style={{marginLeft:"48%",marginRight: "25px", fontSize: "35px"}}></i></a>
      <a className="linkedin" href="https://www.linkedin.com/in/maherbendada"><i className="fa fa-linkedin"></i></a>
  </div>
  );
}

export default Team;

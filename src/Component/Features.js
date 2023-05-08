import React from "react";
import "./Features.css";
import deep from '../assets/features/deep.png'
import cognitive_skills from '../assets/features/cognitive_skills.png'
import fun_engag from '../assets/features/fun_eng.png'
import intra_learn from '../assets/features/intra_learn.png'
import "bootstrap/dist/css/bootstrap.min.css";

const Title = () => {
  return <div id="title"><h1>FEATURES</h1></div>;
};

function Features() {
  return (
    <div className="back_feat" id="features">
	  <Title/>
	  <div className="container">
	   <div className="row">
        <div className="col-md data" >
		  <img src={deep} alt="deep"/>
		  <h5> DEEP LEARNING </h5>
		  <p> FirstWord specifically uses deep learning for object recognition.</p>
        </div>
		<div className="col-md data" >
		  <img src={cognitive_skills} alt="skills" style={{width:"75px"}}/>
		  <h5>CONGNITIVE SKILLS</h5>
		  <p style={{ textAlign: "justify" }}>The platform can help children develop their cognitive skills, such as perception, memory, and attention.</p>
        </div>
		<div className="col-md data" >
		  <img src={fun_engag} alt="fun" style={{width:"105px"}}/>
		  <h5>FUN & ENGAGING</h5>
		  <p style={{ textAlign: "justify" }}>FirstWord is designed to be entertaining and enjoyable for children.</p>
        </div>
		<div className="col-md data" >
		  <img src={intra_learn} alt="fun" style={{width:"105px"}}/>
		  <h5>INTRACTIVE LEARNING</h5>
		  <p style={{ textAlign: "justify", width:"305px", }}>The platform could provide an interactive learning experience that engages children in the learning process. This could include features such as pronouncing the names of objects out loud and providing feedback on correct/incorrect answers..</p>
        </div>
	   </div>
      </div>	   
  </div>
  );
}

export default Features;

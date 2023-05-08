import React from "react";
import "./Services.css";
import free_acc from '../assets/services/free_acc.png'
import skills_evol from '../assets/services/skills_evol.png'
import AI from '../assets/services/AI.jpg'
import lang from '../assets/services/Lang.png'
import { Animator,ScrollContainer, ScrollPage, batch, Fade, FadeIn, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn} from "react-scroll-motion";
const Title = () => {
  return <div className="title"><h1>SERVICES</h1></div>;
};

function Services() {
  return (
    <div className="back" id="services" style={{background:"#00d9ff"}}>
	  <Title/>
	  <ScrollContainer >
		<ScrollPage page={0} > 
		  <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} >
          </Animator>
        </ScrollPage>
		
		<ScrollPage page={1} > 
		  <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} >
          </Animator>
        </ScrollPage>
		
		<ScrollPage page={1}> 
		  <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} >
          </Animator>
        </ScrollPage>
		
		<ScrollPage page={2} > 
          <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} >
           <div id='p'>
             <img className="image" src={free_acc} alt="free_acc"/>
			 <h3> FREE ACCOUNT </h3>
             <p>FirstWord provides a free lifetime account for anyone.</p>
           </div>
          </Animator>
       </ScrollPage>
	   
       <ScrollPage page={3}>
		  <Animator animation={batch(StickyIn(), FadeIn(), ZoomIn())}>
            <div id='p'>
              <img className="image" src={AI} alt="AI"/>
			  <h3> ARTIFICIAL <br/> INTELLIGENCE </h3>
              <p>The platform uses AI technology to assist children in identifying objects in their environment. This allows for accurate and efficient object recognition.</p>
            </div>
		  </Animator>
		</ScrollPage>

		<ScrollPage page={4}>
		  <Animator animation={batch(FadeIn(), Sticky(), MoveIn())}>
			<div id='p'>
			  <img className="image" style={{borderRadius: 0}} src={skills_evol} alt="skills"/>
			  <h3 style={{marginLeft: "3px"}}> SKILLS<br/>EVALUATION</h3>
			  <p>FirstWord allows developers to receive ratings and feedback on their AI models from users.</p>
            </div>
          </Animator>
		</ScrollPage>
		
		<ScrollPage page={5}>
		  <Animator animation={batch(MoveIn(-950,0), Sticky())}>
			<div id='p'>
			  <img className="image" style={{borderRadius: 0}} src={lang} alt="language development"/>
			  <h3 style={{marginLeft: "3px"}}>LANGUAGE<br/>DEVELOPMENT</h3>
			  <p>By pronouncing the names of objects out loud, the platform can also aid in children's language development. This can help children learn new words and expand their vocabulary.</p>
            </div>
          </Animator>
		</ScrollPage>

	</ScrollContainer>
	
  </div>
  );
}

export default Services;

import React from "react";
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Services from './Services';
import Features from './Features';
import Team from './Team';
import Contact from './Contact';
import Footer from './Footer'; 

function Index() {
  return (
     <>
     <header>
        <NavBar />   
     </header>	   
     <Home />
     <About />
	 <Services />
	 <Features />
	 <Team />
	 <Contact/>
	 <Footer />
	 </>
    );
}
export default Index;
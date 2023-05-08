import React, {useState, useEffect} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Footer from '../Component/Footer'; 
import Dash from "./Dash";
import Settings from "./Settings";
import Models from "./Models";
import Logout from "./Logout";
import Add from "./Add";
import Notification from "./Notification";
import Notifications from './Notifications';
import "./styles.css";
import HandTracking from "./HandTracking";
import ReactDOM from "react-dom";
import AImodels from './AImodels';
import Settingspage from './Settingpage';
import AddModel from './AddModel'

const styles = {
  tabs: {
    background: "#fff"
  },
  slide: {
    padding: 15,
    minHeight: "60.5vh",
    color: "#fff",
	marginBottom: "2px"
  },
  slide1: {
    backgroundColor: "#DBE5F1"
  },
  slide2: {
    backgroundColor: "#C6D9F1"
  },
  slide3: {
    backgroundColor: "#8DB3E2"
  },
  slide4: {
    backgroundColor: "#548DD4"
  },
  slide5: {
    backgroundColor: "#365F91"
  }
};

function Dashboard() {
  const [index, setIndex] = useState(0);

  const handleChange = (event, value) => {
	  if(value === 0) {
		   window.navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
				document.getElementById("stream").srcObject = stream;
			})
			.catch(function (err0r) {
				console.log("Something went wrong!");
			});
	  }
	  if(value !== 0) {
		try{
		   document.getElementById("stream").srcObject.getTracks().forEach(function(track) {
			   track.stop();
		   });
		}catch(err){alert(err);}
	  }
	  if(value === 1) {
		  ReactDOM.render(<AImodels/>, document.getElementById("s1"))
	  }
	  if(value === 2) {
		  ReactDOM.render(<AddModel/>, document.getElementById("s2"))
	  }
	  if(value === 3) {
		  ReactDOM.render(<Settingspage/>, document.getElementById("s3"))
	  }
	  if(value === 4) {
		  ReactDOM.render(<Notifications/>, document.getElementById("s4"))
	  }
	  if(value !== 5) {
		setIndex(value);
	  }
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };
  const handleLogout = () => {
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://127.0.0.1:5000/api/logout", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhttp.send();
	window.location.href = "/";
  }
  const [isDeveloper, setIsDeveloper] = useState(false);
   useEffect(() => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {setIsDeveloper(JSON.parse(this.responseText).result) };
	  xhttp.open("POST", "http://127.0.0.1:5000/api/isDeveloper", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send();
    }, []);
  
	return(
	 <>
	  <div className="center">
	    <Tabs value={index} onChange={handleChange} style={styles.tabs} indicatorColor="primary"  orientation="horizontal"
              scrollButtons="auto" variant="scrollable" aria-label="Responsive tabs" >
		   <Tab label={<Dash />}  id="dash"/>
           <Tab label={<Models />}  id="modls"/>
           <Tab label={<Add />}  style={isDeveloper ? { display: 'block' } : { display: 'none' }}/>
		   <Tab label={<Settings /> }  />
		   <Tab label={<Notification />}  style={isDeveloper ? { display: 'block' } : { display: 'none' }}/>
		   <Tab label={<Logout />}  onClick={handleLogout} TabProps={{disabled: index === 5}}/>
	    </Tabs>
	  </div>
	  <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div id = "s0" style={Object.assign({}, styles.slide, styles.slide1)}>
			<HandTracking/>
          </div>
          <div id = "s1" style={Object.assign({}, styles.slide, styles.slide2)}>
          </div>
          <div id = "s2" style={Object.assign({}, styles.slide, styles.slide3)}>
          </div>
		  <div id = "s3" style={Object.assign({}, styles.slide, styles.slide4)}>
          </div>
		  <div id = "s4" style={Object.assign({}, styles.slide, styles.slide5)}>
          </div>
      </SwipeableViews>
	  <Footer />
	 </>
	);
}

export default Dashboard;
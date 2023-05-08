import React, {useEffect, useState} from "react";
import './App.css';
import LoadingScreen from "react-loading-screen";
import Index from '../Component/Index';	
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';
import Verify from '../Verify/Verify';
import Forgot from '../Forgot/Forgot';
import { BrowserRouter as Router, Switch, Route, Redirect  } from "react-router-dom";


function App() {
	const [isLoding, setIsLoding] = useState(true);
	useEffect(() => {
	   setTimeout(() => {
         setIsLoding(false);
       }, 2800);
     }, []) 
	const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {setIsLogin(JSON.parse(this.responseText).result);};
	  xhttp.open("POST", "http://127.0.0.1:5000/api/check_login", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send();
    }, []);
   const [isVerify, setIsVerify] = useState(false);
   useEffect(() => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {setIsVerify(JSON.parse(this.responseText).result) };
	  xhttp.open("POST", "http://127.0.0.1:5000/api/isVerify", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send();
    }, []);
	
  return (
  <>
  {isLoding ? (
        <LoadingScreen
          loading={true}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Loading..."
        />
	  ) : (
		    <Router>
             <Switch>
			   <Route exact path="/">
			     {isLogin ? ( <Redirect to="/dashboard" /> ): (<Index/>)}
			   </Route>
			   <Route exact path="/dashboard">
			     {isLogin ? ( <Dashboard/> ): (<Redirect to="/login" />)}
			   </Route>
			   <Route exact path="/login">
			     {isLogin ? ( <Redirect to="/dashboard" /> ): (<Login />)}
			   </Route>
			   <Route exact path="/signup">
			     {isLogin ? ( <Redirect to="/dashboard" /> ): (<Signup />)}
			   </Route>
			   <Route exact path="/verify">
			     {isLogin ? ( isVerify ? (<Redirect to="/dashboard" />):(<Verify/>)  ): (<Redirect to="/login" />)}
			   </Route>
			   <Route exact path="/forgot">
			     {isLogin ? ( <Redirect to="/dashboard" /> ): (<Forgot />)}
			   </Route>
			 </Switch>
			</Router> 
  )}
  </>
  ); //end return
}

export default App;

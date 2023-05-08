import React, { useState } from "react";
import "./Captcha.css";

function Captcha() {
  const [captcha, setCaptcha] = useState(
    Math.random().toString(36).substring(2, 8).toUpperCase().substring(0, 6)
  );

  function reloadCaptcha() {
    setCaptcha(
      Math.random().toString(36).substring(2, 8).toUpperCase().substring(0, 6)
    );
  }
  return (
    <div className="captcha">
      <span id="capt">{captcha}</span>
      <p onClick={reloadCaptcha}>Reload Captcha</p>
      <input
        type="text"
        id="captchaInput"
        placeholder="Enter Captcha"
        maxLength="6"
      />
    </div>
  );
}

export default Captcha;

import React from "react";
import "./styles.css";
import LogoutIcon from "@mui/icons-material/Logout";
function Logout() {
  return (
    <div className="tabnName">
      <LogoutIcon />
      <span> Logout </span>
    </div>
  );
}
export default Logout;
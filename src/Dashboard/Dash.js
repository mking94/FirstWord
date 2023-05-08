import React from "react";
import "./styles.css";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
function Dash() {
  return (
    <div className="tabnName">
      <DashboardCustomizeIcon />
      <span> Dashboard </span>
    </div>
  );
}
export default Dash;
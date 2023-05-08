import React from "react";
import "./styles.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
function Notification() {
  return (
    <div className="tabnName">
      <NotificationsIcon />
      <span> Notifications </span>
    </div>
  );
}
export default Notification;
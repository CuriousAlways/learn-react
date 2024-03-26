// import { useSelector } from "react-redux";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContextProvider";

const Notification = () => {
  // const notification = useSelector((state) => state.notification);
  const [notification, _] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification && notification.length > 0) {
    return <div style={style}>{notification}</div>;
  }
};

export default Notification;

import { useReducer, createContext } from "react";
import notificationReducer from "../reducers/notificationReducer";

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatcher] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatcher]}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

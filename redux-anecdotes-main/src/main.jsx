import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { NotificationContextProvider } from "./contexts/NotificationContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
);

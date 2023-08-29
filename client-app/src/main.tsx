import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import App from "./app/layout/App";
import "./app/layout/styles.css";
import { StoreContext, store } from "./app/stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
  // </React.StrictMode>
);

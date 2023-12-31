import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import { router } from "./app/router/Routes";
import { StoreContext, store } from "./app/stores/store";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
);

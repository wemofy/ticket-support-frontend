import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TicketContextProvider } from "./context/TicketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense>
    <BrowserRouter>
      <TicketContextProvider>
        <App />
      </TicketContextProvider>
    </BrowserRouter>
  </Suspense>
);

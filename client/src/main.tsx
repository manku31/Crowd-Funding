import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css";
import { StateContextProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="beb4d838ce8de09ac13c62c84d2f0105"
    >
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);

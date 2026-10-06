import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NeutronicProvider } from "@ionnet/neutronic-react";
import "@ionnet/neutronic/styles.css";
import "./docs/docs.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NeutronicProvider>
      <App />
    </NeutronicProvider>
  </StrictMode>,
);

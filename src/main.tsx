import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import withMountLog from "./hocs/withMountLog";
import "./index.css";


const AppWithLogging = withMountLog(App);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithLogging />
  </StrictMode>
);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthGuard from "./components/authgaurd.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthGuard>
        <App />
      </AuthGuard>
    </BrowserRouter>
  </StrictMode>,
);

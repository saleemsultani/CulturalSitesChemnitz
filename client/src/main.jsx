import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SiteProvider } from "./components/contexts/SiteContext.jsx";
import { AuthProvider } from "./components/contexts/auth.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SiteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteProvider>
  </AuthProvider>
);

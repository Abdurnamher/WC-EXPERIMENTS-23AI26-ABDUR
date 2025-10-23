import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // ✅ THIS IS THE IMPORTANT LINE

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FirebaseProvider } from "./components/firebase/FirebaseProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);

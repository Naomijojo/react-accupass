import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./assets/css/index.css"
import '@/mock/index.js';
import '@/i18n'

//入口頁面
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
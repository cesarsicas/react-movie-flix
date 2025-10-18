import './index.css'
import App from './App.tsx'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from './Login.tsx';


const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
);

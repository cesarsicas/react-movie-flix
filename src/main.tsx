import './index.css'
import { Login } from './pages/Login.tsx';
import { Home } from './pages/Home.tsx';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";


const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Favorites from "./pages/Favorites.jsx";
import SharedList from "./pages/SharedList.jsx";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shared/:shareId" element={<SharedList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

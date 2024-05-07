import React from "react";
import "./assets/tStyle.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./layout/MainPage";
import PostWrite from "./pages/PostWrite";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* outlet으로 화면 나옴 */}
          <Route index element={<MainPage />} />
          <Route path="/postwrite" element={<PostWrite />} />
          {/* outlet으로 화면 나옴 */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

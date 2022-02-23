import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/index";
import { Main } from "./pages";

function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-2xl mx-auto my-0">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/leagues" element={<div>123</div>} />
            <Route path="/teams" element={<div>123</div>} />
          </Routes>
      </div>
    </>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/index";
import { Competitions, PageNotFound, CompetitionPage } from "./pages";

function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1535px] mx-auto my-0 px-4">
          <Routes>
            <Route path="/" element={<Competitions />} />
            <Route path="/:id/matches" element={<CompetitionPage />} />
            <Route path="/leagues" element={<Competitions />} />
            <Route path="/teams" element={<div>123</div>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </div>
    </>
  );
}

export default App;

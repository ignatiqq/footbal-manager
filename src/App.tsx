import React from 'react';
import { useRoutes } from "react-router-dom";

import { Header } from "./components/index";
import { Competitions, PageNotFound, CompetitionPage, Teams, TeamMatches } from "./pages";

const AppRoutes = () => useRoutes([
  {path: "/", element: <Competitions />},
  {path: "/leagues", element: <Competitions />},
  {path: "/leagues/:id/matches", element: <CompetitionPage />},
  {path: "/teams", element: <Teams/>},
  {path: "/teams/:id/matches", element: <TeamMatches />},
  {path: "*", element: <PageNotFound />}
])

function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1535px] mx-auto my-0 px-4">
          <AppRoutes />
      </div>
    </>
  );
}

export default App;

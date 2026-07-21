import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { SaveProvider } from "./state/SaveContext";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import JourneyPage from "./pages/JourneyPage";
import MissionsPage from "./pages/MissionsPage";
import PlansPage from "./pages/PlansPage";
import SettingsPage from "./pages/SettingsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: "inicio", element: <HomePage /> },
      { path: "personagens", element: <CharactersPage /> },
      { path: "jornada", element: <JourneyPage /> },
      { path: "missoes", element: <MissionsPage /> },
      { path: "planos", element: <PlansPage /> },
      { path: "config", element: <SettingsPage /> },
      { path: "*", element: <Navigate to="/inicio" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SaveProvider>
      <RouterProvider router={router} />
    </SaveProvider>
  </StrictMode>,
);

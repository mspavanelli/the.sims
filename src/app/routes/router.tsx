import { Navigate, createHashRouter } from "react-router-dom";
import { CharactersPage } from "@/pages/characters";
import { HomePage } from "@/pages/home";
import { JourneyPage } from "@/pages/journey";
import { MissionsPage } from "@/pages/missions";
import { PlansPage } from "@/pages/plans";
import { SettingsPage } from "@/pages/settings";
import { AppShell } from "@/widgets/app-shell";

export const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
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

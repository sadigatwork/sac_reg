import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Bootstrap CSS & Bootstrap Bundle JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Components imports
import CreateUniversity from "./components/CreateUniversity";
import UniversityList from "./components/UniversityList";
import UniversityDetails from "./components/UniversityDetails";
import UpdateUniversityInfo from "./components/UpdateUniversityInfo";

// Routes
const router = createBrowserRouter([
  { path: "/", element: <UniversityList /> },
  { path: "/create-university", element: <CreateUniversity /> },
  { path: "/show-university/:id", element: <UniversityDetails /> },
  { path: "/edit-university/:id", element: <UpdateUniversityInfo /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import Projects from "../pages/Projects/Projects";
import CreateProject from "../pages/CreateProject/CreateProject";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import ProjectWorkspace from "../pages/ProjectWorkspace/ProjectWorkspace";
  


export default function AppRoutes() {
    
  return (
  <Routes>

  <Route
    path="/"
    element={<Login />}
  />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route

 path="/projects"

 element={

  <ProtectedRoute>

      <Projects/>

  </ProtectedRoute>

 }
/>
<Route
 path="/create-project"
 element={
   <ProtectedRoute>
      <CreateProject/>
   </ProtectedRoute>
 }
/>
<Route
    path="/projects/:projectId"
    element={
        <ProtectedRoute>
           <ProjectWorkspace />
        </ProtectedRoute>
    }
/>

</Routes>
  );
}
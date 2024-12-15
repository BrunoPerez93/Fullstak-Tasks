import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
      <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/tasks/:id" element={<TaskFormPage />} />
          <Route path="/add-task" element={<TaskFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

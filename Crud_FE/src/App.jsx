import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/add-task" element={<AddTaskPage />} /> */}
        <Route path="/tasks" element={<TaskPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </>
  );
}

export default App;

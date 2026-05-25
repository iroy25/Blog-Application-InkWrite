import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <div>Admin Dashboard</div>
          </AdminRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
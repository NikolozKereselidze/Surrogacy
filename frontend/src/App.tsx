import "./App.css";
import Home from "./pages/Home";
import OurMission from "./pages/OurMission";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import BlogManagement from "./pages/Admin/BlogManagement";
import DonorManagement from "./pages/Admin/DonorManagement";
import MainLayout from "./components/MainLayout";
import AdminNav from "./components/Admin/AdminNav";
import Donors from "./pages/Donors";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import DonorLayout from "./components/DonorLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
      </Route>

      <Route element={<DonorLayout />}>
        <Route
          path="/find-egg-donor"
          element={
            <ProtectedRoute>
              <Donors />
            </ProtectedRoute>
          }
          />
        <Route
          path="/surrogates"
          element={
            <ProtectedRoute>
              <Donors />
            </ProtectedRoute>
          }
          />
        <Route
          path="/sperm-donors"
          element={
            <ProtectedRoute>
              <Donors />
            </ProtectedRoute>
          }
          />
          </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminNav />}>
        <Route index element={<Dashboard />} />
        <Route path="blog" element={<BlogManagement />} />
        <Route
          path="egg-donors"
          element={<DonorManagement donorType="egg-donors" />}
        />
        <Route
          path="surrogates"
          element={<DonorManagement donorType="surrogates" />}
        />
        <Route
          path="sperm-donors"
          element={<DonorManagement donorType="sperm-donors" />}
        />
      </Route>
    </Routes>
  );
}

export default App;

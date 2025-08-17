import "./App.css";
import Home from "./pages/Home";
import OurMission from "./pages/OurMission";
import WhyChooseUs from "./pages/WhyChooseUs";
import OurTeam from "./pages/OurTeam";
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
import DonorCard from "./pages/DonorCard";
import WhoWeAre from "./pages/WhoWeAre";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/our-team" element={<OurTeam />} />
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
      <Route path="/admin-login" element={<Login isAdmin={true} />} />

      <Route path="/admin" element={<AdminNav />}>
        <Route
          index
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="blog"
          element={
            <ProtectedRoute isAdmin={true}>
              <BlogManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="egg-donors"
          element={
            <ProtectedRoute isAdmin={true}>
              <DonorManagement donorType="egg-donors" />
            </ProtectedRoute>
          }
        />
        <Route
          path="surrogates"
          element={
            <ProtectedRoute isAdmin={true}>
              <DonorManagement donorType="surrogates" />
            </ProtectedRoute>
          }
        />
        <Route
          path="sperm-donors"
          element={
            <ProtectedRoute isAdmin={true}>
              <DonorManagement donorType="sperm-donors" />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/donor/:id"
        element={
          <ProtectedRoute>
            <DonorCard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

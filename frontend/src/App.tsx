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

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/find-egg-donor" element={<Donors />} />
        <Route path="/surrogates" element={<Donors />} />
        <Route path="/sperm-donors" element={<Donors />} />
      </Route>

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

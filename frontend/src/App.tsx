import "./App.css";
import Home from "./pages/Home";
import OurMission from "./pages/OurMission";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import BlogManagement from "./pages/Admin/BlogManagement";
import MainLayout from "./components/MainLayout";
import AdminNav from "./components/Admin/AdminNav";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
      </Route>

      <Route path="/admin" element={<AdminNav />}>
        <Route index element={<Dashboard />} />
        <Route path="blog" element={<BlogManagement />} />
      </Route>
    </Routes>
  );
}

export default App;

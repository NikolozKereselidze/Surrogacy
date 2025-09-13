import "./App.css";
import { Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home";

// About
import OurMission from "./pages/About/OurMission";
import WhyChooseUs from "./pages/About/WhyChooseUs";
import OurTeam from "./pages/About/OurTeam";
import WhoWeAre from "./pages/About/WhoWeAre";

// Surrogates
import SurrogacyProcess from "./pages/Surrogates/SurrogacyProcess";
import WhoCanBecomeSurrogate from "./pages/Surrogates/WhoCanBecomeSurrogate";

// Admin
import Dashboard from "./pages/Admin/Dashboard";
import BlogManagement from "./pages/Admin/BlogManagement";
import DonorManagement from "./pages/Admin/DonorManagement";
import MainLayout from "./components/MainLayout";
import AdminNav from "./components/Admin/AdminNav";

// Donors
import Donors from "./pages/Donors";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

// Donor
import DonorLayout from "./components/DonorLayout";
import DonorCard from "./pages/DonorCard";

// Blog

import BlogPost from "./pages/BlogPost";
import WhoCanBecomeDonor from "./pages/Donors/WhoCanBecomeDonor";
import WhoCanBecomeParent from "./pages/Parents/WhoCanBecomeParent";
import SurrogateScreening from "./pages/Surrogates/SurrogateScreening";
import ParentScreening from "./pages/Parents/ParentScreening";
import SupportAndCounselling from "./pages/SupportAndCounselling";
import SurrogacyWithOwnGametes from "./pages/Programs/SurrogacyWithOwnGametes";
import EggFreezing from "./pages/Programs/EggFreezing";

function App() {
  return (
    <Routes>
      {/* Existing non-prefixed public routes (kept for compatibility) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/our-team" element={<OurTeam />} />

        {/* Surrogates */}
        <Route path="/surrogacy-process" element={<SurrogacyProcess />} />
        <Route path="/surrogate-screening" element={<SurrogateScreening />} />
        <Route
          path="/who-can-become-a-surrogate"
          element={<WhoCanBecomeSurrogate />}
        />

        {/* Blog */}
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* Donors */}
        <Route path="/who-can-become-a-donor" element={<WhoCanBecomeDonor />} />

        {/* Parents */}
        <Route
          path="/who-can-become-a-parent"
          element={<WhoCanBecomeParent />}
        />
        <Route path="/parent-screening" element={<ParentScreening />} />
        <Route
          path="/support-and-counselling"
          element={<SupportAndCounselling />}
        />

        {/* Programs */}
        <Route
          path="/surrogacy-with-own-gametes"
          element={<SurrogacyWithOwnGametes />}
        />
        <Route path="/egg-freezing-preservation" element={<EggFreezing />} />
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

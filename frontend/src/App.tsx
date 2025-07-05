import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ContactUs from "./components/ContactUs";
import Home from "./pages/Home";
import OurMission from "./pages/OurMission";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
      </Routes>
      <ContactUs />
      <Footer />
    </Router>
  );
}

export default App;

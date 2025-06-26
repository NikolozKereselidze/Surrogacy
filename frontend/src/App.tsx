import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Home />
    </BrowserRouter>
  );
}

export default App;

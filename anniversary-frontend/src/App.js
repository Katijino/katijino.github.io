import { Routes, Route } from "react-router-dom";
import NavBar from "../../anniversary-frontend/src/components/NavBar";
import Landing from "../../anniversary-frontend/src/pages/Landing";
import Timeline from "../../anniversary-frontend/src/pages/Timeline";
import FuturePlans from "../../anniversary-frontend/src/pages/FuturePlans";
import './App.css';

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/future" element={<FuturePlans />} />
      </Routes>
    </div>
  );
}

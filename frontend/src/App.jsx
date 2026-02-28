import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DevisPage from "./pages/DevisPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/devis" element={<DevisPage />} />
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DevisPage from "./pages/DevisPage";
import EtudeStructure from "./pages/EtudeStrucrture";
import AdminPage from "./pages/AdminPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/devis" element={<DevisPage />} />
       <Route path="/admin" element={<AdminPage/>}/>

      <Route path="/devis/etude-structure" element={<EtudeStructure/>}/>
    </Routes>
  );
}

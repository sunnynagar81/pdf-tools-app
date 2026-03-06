import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SignaturePage from "./pages/SignaturePage";
import MergePage from "./pages/MergePage";
import CompressPage from "./pages/CompressPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signature" element={<SignaturePage />} />
        <Route path="/merge" element={<MergePage />} />
        <Route path="/compress" element={<CompressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
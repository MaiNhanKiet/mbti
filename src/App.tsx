// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MbtiTestPage from './pages/MbtiTestPage';
import ResultsPage from './pages/ResultsPage';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/test" element={<MbtiTestPage />} /> 
        <Route path="/results/:mbtiType" element={<ResultsPage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}
export default App;
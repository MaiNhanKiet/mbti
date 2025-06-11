// src/App.tsx (or your main router file)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import MbtiLandingPage from './pages/MbtiLandingPage'; 
import DiscLandingPage from './pages/DiscLandingPage'; 
import MbtiTestPage from './pages/MbtiTestPage';
import MbtiResultsPage from './pages/MbtiResultsPage';
import DiscTestPage from './pages/DiscTestPage'; 
import DiscResultsPage from './pages/DiscResultPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* New Homepage as root */}
        
        <Route path="/mbti" element={<MbtiLandingPage />} />
        <Route path="/mbti/test" element={<MbtiTestPage />} />
        <Route path="/mbti/results/:mbtiType" element={<MbtiResultsPage />} /> {/* Assuming results are under /mbti */}

        <Route path="/disc" element={<DiscLandingPage />} />
        <Route path="/disc/test" element={<DiscTestPage />} />
        <Route path="/disc/results/:discProfile" element={<DiscResultsPage />} />

        {/* Add other test routes here */}
      </Routes>
    </Router>
  );
}

export default App;
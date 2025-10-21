import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PresentationsPage from './pages/PresentationsPage';
import PresentationPage from './pages/PresentationPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/presentations" element={<PresentationsPage />} />
          <Route path="/presentation/:id" element={<PresentationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

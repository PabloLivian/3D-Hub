import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './App.css';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Companies = lazy(() => import('./pages/Companies'));
const Contact = lazy(() => import('./pages/Contact'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

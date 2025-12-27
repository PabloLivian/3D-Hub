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
const Artists = lazy(() => import('./pages/Artists'));
const Contact = lazy(() => import('./pages/Contact'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const JoinList = lazy(() => import('./pages/JoinList'));
const NotFound = lazy(() => import('./pages/NotFound'));

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/join" element={<JoinList />} />
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

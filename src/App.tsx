import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { HomeProvider } from './Modules/Home/Provider/HomeProvider';
import HomeView from './Modules/Home/View/HomeView';
import Loader from './components/UI/Loader';
import ScrollToTop from './components/UI/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/main.scss';

// Lazy load pages for better performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HomeProvider>
        <Header />
        <Suspense fallback={<Loader fullPage size="lg" />}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </HomeProvider>
    </BrowserRouter>
  );
}

export default App;

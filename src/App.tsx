import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import IntroScreen from './components/UI/IntroScreen';
import { HomeProvider } from './Modules/Home/Provider/HomeProvider';
import HomeView from './Modules/Home/View/HomeView';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/UI/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/main.scss';

import ProjectDetailPage from './pages/ProjectDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WorkflowDetailPage from './pages/WorkflowDetailPage';
import AboutDetailPage from './pages/AboutDetailPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HomeProvider>
        <IntroScreen />
        <Header />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/:id" element={<AboutDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/workflow/:id" element={<WorkflowDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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

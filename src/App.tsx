import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import IntroSplash from './components/IntroSplash';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

type Page = 'home' | 'services' | 'products' | 'portfolio' | 'about' | 'contact' | 'admin' | 'privacy' | 'terms';

function getInitialPage(): Page {
  if (typeof window !== 'undefined') {
    if (window.location.hash === '#/admin') return 'admin';
    if (window.location.hash === '#/privacy') return 'privacy';
    if (window.location.hash === '#/terms') return 'terms';
  }
  return 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#/admin') setCurrentPage('admin');
      else if (window.location.hash === '#/privacy') setCurrentPage('privacy');
      else if (window.location.hash === '#/terms') setCurrentPage('terms');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    if (page === 'admin') {
      window.location.hash = '#/admin';
    } else if (page === 'privacy') {
      window.location.hash = '#/privacy';
    } else if (page === 'terms') {
      window.location.hash = '#/terms';
    } else if (window.location.hash) {
      window.location.hash = '';
    }
  };

  // Admin page renders standalone — no nav/footer
  if (currentPage === 'admin') {
    return <Admin />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':      return <Home onNavigate={navigate} />;
      case 'services':  return <Services onNavigate={navigate} />;
      case 'products':  return <Products onNavigate={navigate} />;
      case 'portfolio': return <Portfolio onNavigate={navigate} />;
      case 'about':     return <About onNavigate={navigate} />;
      case 'contact':   return <Contact onNavigate={navigate} />;
      case 'privacy':   return <PrivacyPolicy onNavigate={navigate} />;
      case 'terms':     return <TermsConditions onNavigate={navigate} />;
      default:          return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
      <Navigation currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;

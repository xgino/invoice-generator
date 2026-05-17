import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Help from './pages/help';

// SEO Hub Pages (The Directories)
import { CompareHub } from './pages/compare/CompareHub';
import { IndustriesHub } from './pages/industries/IndustriesHub';
import { TemplatesHub } from './pages/templates/TemplatesHub';

// SEO Dynamic Pages (The Long-Form Content)
import { ComparePage } from './pages/compare/ComparePage';
import { IndustryPage } from './pages/industries/IndustryPage';
import { TemplatePage } from './pages/templates/TemplatePage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Landing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help" element={<Help />} />

          {/* Programmatic SEO: Comparisons */}
          <Route path="/compare" element={<CompareHub />} />
          <Route path="/compare/:slug" element={<ComparePage />} />

          {/* Programmatic SEO: Industries */}
          <Route path="/industries" element={<IndustriesHub />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />

          {/* Programmatic SEO: Templates */}
          <Route path="/templates" element={<TemplatesHub />} />
          <Route path="/templates/:slug" element={<TemplatePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
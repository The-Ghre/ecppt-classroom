import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Masthead } from './components/Masthead';
import { Footer } from './components/Footer';
import { Overview } from './routes/Overview';
import { SessionView } from './routes/SessionView';
import { Present } from './routes/Present';
import { SearchPage } from './routes/SearchPage';
import { Reference } from './routes/Reference';
import { NotFound } from './routes/NotFound';
import { CommandMenu } from './components/CommandMenu';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <a href="#main" className="skip">Skip to content</a>
      <Masthead />
      <main id="main" className="grow">{children}</main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <>
      <ScrollTop />
      <CommandMenu />
      <Routes>
        {/* Presentation player is full-screen — its own chrome. */}
        <Route path="/present/:id" element={<Present />} />
        <Route path="/present/:id/:slide" element={<Present />} />

        <Route path="/" element={<Chrome><Overview /></Chrome>} />
        <Route path="/session/:id" element={<Chrome><SessionView /></Chrome>} />
        <Route path="/search" element={<Chrome><SearchPage /></Chrome>} />
        <Route path="/reference" element={<Chrome><Reference /></Chrome>} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Chrome><NotFound /></Chrome>} />
      </Routes>
    </>
  );
}

import { useEffect } from 'react';
import { openCommandMenu } from '../components/CommandMenu';
import { Link } from 'react-router-dom';
import { I } from '../components/icons';

/* A dedicated search entry that opens the command palette. The palette is
   the primary search surface (available everywhere via "/"). */
export function SearchPage() {
  useEffect(() => { openCommandMenu(); }, []);
  return (
    <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
      <span className="readout readout--dim">SEARCH</span>
      <h1 className="h-xl" style={{ marginTop: 12 }}>Search the course</h1>
      <p className="lede" style={{ margin: '12px auto 24px' }}>Press <kbd className="kbd">/</kbd> anywhere to search every slide, or open it below.</p>
      <button className="btn btn--primary" onClick={() => openCommandMenu()}><I.search /> Open search</button>
      <p style={{ marginTop: 20 }}><Link to="/">Back to the roadmap</Link></p>
    </div>
  );
}

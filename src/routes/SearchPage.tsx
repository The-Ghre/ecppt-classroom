import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { openCommandMenu } from '../components/CommandMenu';
import { I } from '../components/icons';

export function SearchPage() {
  useEffect(() => { openCommandMenu(); }, []);
  return (
    <div className="lone wrap">
      <div className="lone__panel">
        <h1 className="h-xl">Search every slide</h1>
        <p className="lede">Press <kbd className="kbd">/</kbd> anywhere to search titles and teaching content across all fifteen sessions.</p>
        <div className="lone__cta">
          <button className="btn btn--primary" onClick={() => openCommandMenu()}><I.search /> Open search</button>
          <Link to="/" className="btn">Course board</Link>
        </div>
      </div>
    </div>
  );
}

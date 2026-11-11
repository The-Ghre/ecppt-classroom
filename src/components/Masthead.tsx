import { NavLink, Link } from 'react-router-dom';
import { I } from './icons';
import { openCommandMenu } from './CommandMenu';

export function Masthead() {
  return (
    <header className="masthead">
      <div className="wrap">
        <div className="masthead__in">
          <Link to="/" className="brandmark" aria-label="CODED eCPPT Classroom — course board">
            <span className="brandmark__logo">CODED</span>
            <span className="brandmark__sub">eCPPT <b>·</b> rev 26.11</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/" end>Board</NavLink>
            <NavLink to="/reference">Attack path</NavLink>
            <button type="button" className="nav__search" onClick={() => openCommandMenu()} aria-label="Search the course (press /)">
              <I.search /> <span>Search</span> <kbd className="kbd">/</kbd>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

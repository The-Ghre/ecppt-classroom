import { Link } from 'react-router-dom';
import { I } from '../components/icons';

export function NotFound() {
  return (
    <div className="nf wrap">
      <div className="nf__panel panel ticked">
        <span className="readout readout--blue">404 · NO ROUTE TO HOST</span>
        <h1 className="display">This path doesn’t resolve.</h1>
        <p className="lede">The page you asked for isn’t on the map. Head back to the roadmap and pick a session,
          or search the whole course.</p>
        <div className="nf__cta">
          <Link to="/" className="btn btn--primary"><I.map /> Roadmap</Link>
          <Link to="/reference" className="btn btn--ghost"><I.target /> Attack chain</Link>
        </div>
      </div>
    </div>
  );
}

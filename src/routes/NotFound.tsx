import { Link } from 'react-router-dom';
import { I } from '../components/icons';

export function NotFound() {
  return (
    <div className="lone wrap">
      <div className="lone__panel">
        <div className="lone__trace" aria-hidden><i /><b /><i /><span className="lone__rats" /><i className="lone__open" /></div>
        <h1 className="h-xl">Open circuit.</h1>
        <p className="lede">This address doesn’t route anywhere on the board. Head back and pick a session, or search every slide.</p>
        <div className="lone__cta">
          <Link to="/" className="btn btn--primary"><I.map /> Course board</Link>
          <Link to="/reference" className="btn"><I.target /> Attack path</Link>
        </div>
      </div>
    </div>
  );
}

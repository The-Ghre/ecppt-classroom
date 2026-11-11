import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

import './styles/tokens.css';
import './styles/app.css';
import './styles/blocks.css';
import './styles/board.css';
import './styles/diagrams.css';
import './styles/routes.css';
import './styles/present.css';
import './styles/print.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter: deep links, refresh, and back/forward all work on a
        GitHub Pages project subpath with no server configuration. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);

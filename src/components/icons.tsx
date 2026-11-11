/* One consistent icon set — drawn SVG, single stroke weight, 1.6px.
   Never emoji or unicode glyphs standing in for icons. */
import type { SVGProps } from 'react';

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p,
});

export const I = {
  evidence: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
  attacker: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 2l3 5 5 1-3.5 3.5L17 17l-5-2.5L7 17l.5-5.5L4 8l5-1z" /></svg>),
  valid: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M8 12l2.5 2.5L16 9" /></svg>),
  caution: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17h.01" /></svg>),
  cross: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>),
  network: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="5" cy="12" r="2.4" /><circle cx="19" cy="6" r="2.4" /><circle cx="19" cy="18" r="2.4" /><path d="M7.2 11l9.6-4M7.2 13l9.6 4" /></svg>),
  identity: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>),
  terminal: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></svg>),
  arrowR: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  arrowL: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>),
  chevronR: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>),
  chevronD: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>),
  grid: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
  play: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M7 5l12 7-12 7z" /></svg>),
  book: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 1 2-2h12" /></svg>),
  map: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>),
  search: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>),
  expand: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>),
  shrink: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>),
  keyboard: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></svg>),
  link: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 0 1 6 6l-1 1M13.5 17.5l-1 1a4 4 0 0 1-6-6l1-1" /></svg>),
  close: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>),
  print: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M6 9V3h12v6" /><rect x="4" y="9" width="16" height="8" rx="2" /><path d="M8 17h8v4H8z" /></svg>),
  target: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /></svg>),
  question: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.4-1.4 1-1.4 2M12 17h.01" /></svg>),
  server: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>),
  lock: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>),
  flag: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 21V4M5 4h11l-2 3 2 3H5" /></svg>),
  clock: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  dot: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" /></svg>),
  menu: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>),
  reasoning: (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 3a6 6 0 0 1 4 10.5V17H8v-3.5A6 6 0 0 1 12 3z" /><path d="M9 20h6M10 22h4" /></svg>),
};

export type IconName = keyof typeof I;

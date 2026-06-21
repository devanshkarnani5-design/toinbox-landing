// Simple inline icon set — minimal stroke icons
const Icon = ({ name, size = 16, ...rest }) => {
  const s = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    arrow: <path d="M5 12h14m-6-6l6 6-6 6" />,
    chev: <path d="M9 6l6 6-6 6" />,
    sparkle: <g><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" /><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" /></g>,
    bolt: <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />,
    mail: <g><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></g>,
    user: <g><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></g>,
    forward: <g><path d="M14 7l5 5-5 5" /><path d="M19 12H8a4 4 0 00-4 4v2" /></g>,
    target: <g><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></g>,
    paperclip: <path d="M21 11l-9.5 9.5a5 5 0 01-7-7L13.5 5a3.5 3.5 0 015 5L8.5 19.5" />,
    check: <path d="M5 12l5 5L20 7" />,
    play: <path d="M8 5v14l11-7L8 5z" fill="currentColor" />,
    search: <g><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></g>,
    lock: <g><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></g>,
    star: <path d="M12 3l2.6 6 6.4.6-5 4.4 1.5 6.4L12 17l-5.5 3.4L8 14 3 9.6 9.4 9z" />,
    file: <g><path d="M7 3h8l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M15 3v5h5" /></g>,
    inbox: <g><path d="M3 13l3-8h12l3 8" /><path d="M3 13h5l1 3h6l1-3h5v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z" /></g>,
    chart: <g><path d="M4 4v16h16" /><path d="M7 14l4-4 3 3 5-6" /></g>,
    panel: <g><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M15 4v16" /></g>,
    plug: <g><path d="M10 2v6m4-6v6M7 8h10v4a5 5 0 01-10 0V8z" /><path d="M12 17v5" /></g>,
    bolt2: <path d="M13 2L4 13h6l-1 9 9-12h-6l1-8z" />,
    eye: <g><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></g>,
    handshake: <g><path d="M12 11l2-2 5 5-2 2-2-2" /><path d="M14 9l-4-4-7 7 2 2 3-3" /><path d="M9 16l3 3 2-2" /></g>,
    cursor: <path d="M5 3l14 9-7 1-3 7-4-17z" fill="currentColor" stroke="white" strokeWidth="1.2" />,
    sliders: <g><path d="M4 8h10M14 8a2 2 0 104 0 2 2 0 00-4 0zM4 16h2M6 16a2 2 0 104 0 2 2 0 00-4 0zM10 16h10" /></g>,
    card: <g><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></g>,
  };
  return <svg {...s} {...rest}>{paths[name]}</svg>;
};
window.Icon = Icon;

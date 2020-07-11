import React from 'react';
import ReactDOM from 'react-dom';

import SimpleMap from './frontend/simplemap';
// import Sidebar from './frontend/sidebar';

// document.addEventListener("DOMContentLoaded", () => {
//   const sidebar = document.getElementById('sidebar');
//   ReactDOM.render(<Sidebar />, sidebar);
// });

document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById('map');
  ReactDOM.render(<SimpleMap />, map);
});
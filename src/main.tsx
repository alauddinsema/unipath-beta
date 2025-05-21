
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import * as serviceWorker from './serviceWorker';

// Store page load time to detect tab switching vs fresh loads
window.localStorage.setItem('pageLoadTime', Date.now().toString());

// Track user interaction with timestamps - throttled to avoid excessive writes
let lastWriteTime = 0;
const THROTTLE_INTERVAL = 1000; // 1 second

const updateLastInteraction = () => {
  const now = Date.now();
  if (now - lastWriteTime > THROTTLE_INTERVAL) {
    window.localStorage.setItem('lastInteraction', now.toString());
    lastWriteTime = now;
  }
};

// Track user interactions
document.addEventListener('click', updateLastInteraction);
document.addEventListener('keydown', updateLastInteraction);
document.addEventListener('scroll', updateLastInteraction);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();

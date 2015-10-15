import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
let createHistory;

if (__SERVER__) {
  createHistory = createMemoryHistory;
} else {
  createHistory = createBrowserHistory;
}

export default createHistory;

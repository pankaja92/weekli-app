import React from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
import Root from './App';

initAnalytics(`${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`);

const Main = withRouter(withAnalytics(Root));

const App = () => (
  <Router>
    <Main />
  </Router>
);

export default App;

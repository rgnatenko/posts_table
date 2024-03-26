import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import store from './redux/store/store';
import App from './App';
import { HomePage } from './pages/HomePage';
import React from 'react';
import { PostPage } from './pages/PostPage';

export const Routing: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={(
        <Provider store={store}>
          <App />
        </Provider>
      )}>
        <Route index element={<HomePage />} />
        <Route path=":id" element={<PostPage />} />
      </Route>
    </Routes>
  </Router>
);

import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import store from './redux/store/store';
import App from './App';
import { HomePage } from './pages/HomePage';
import React from 'react';
import { PostPage } from './pages/PostPage';
import { CreatePostPage } from './pages/CreatePostPage';

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
        <Route path="/create" element={<CreatePostPage />} />
      </Route>
    </Routes>
  </Router>
);

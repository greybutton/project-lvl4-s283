import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import generateStore from './store';
import App from './components/App';

export default (gon) => {
  const store = generateStore(gon);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
  return store;
};

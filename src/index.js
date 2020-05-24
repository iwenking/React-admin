import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import memoryUtils from './utils/memoryUtils'
import storageUtile from './utils/storageUtile'


const user = storageUtile.getUser();
memoryUtils.user = user;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


serviceWorker.unregister();

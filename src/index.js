import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

var httpServer = window.location.origin + '/messages';
var webSocketServer = io(window.location.origin);

ReactDOM.render(<App httpServer={httpServer} webSocketServer={webSocketServer}/>, document.getElementById('root'));
registerServiceWorker();

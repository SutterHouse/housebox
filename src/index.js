import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var httpServer = window.location.origin + '/messages';
var webSocketServer = new WebSocket('ws://' + window.location.host);

ReactDOM.render(<App httpServer={httpServer} webSocketServer={webSocketServer}/>, document.getElementById('root'));
registerServiceWorker();

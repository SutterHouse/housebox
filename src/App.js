import React, { Component } from 'react';
import './style.css';
import MessageList from './MessageList.js';
import axios from 'axios';

let sampleData = [{
    username: 'testuser1',
    text: 'hello!'
  },
  {
    username: 'testuser2',
    text: 'hey?'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.fetchPrevMessages();
    this.connectToWebSocket();
  }

  fetchPrevMessages() {
    var url = window.location.origin + '/messages';
    axios.get(url).then(result => {
      console.log(result.data);
      this.setState({ messages: result.data });
    })
  }

  connectToWebSocket() {
    var wsURL = 'ws://' + window.location.host;
    var ws = new WebSocket(wsURL);

    ws.onopen = () => {
      ws.onmessage = (e) => {
        console.log(e.data);
      }
  
      ws.send('client reporting for duty!');
    };
    
  }

  render() {
    return <MessageList messages = {this.state.messages}/>;
  }
}

export default App;
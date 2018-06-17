import React, { Component } from 'react';
import './style.css';
import MessageList from './MessageList.js';
import UserInput from './UserInput.js';
import axios from 'axios';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: 'anon',
      room: 'lobby'
    };
  }

  componentDidMount() {
    this.fetchPrevMessages();
    this.connectToWebSocket();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  fetchPrevMessages() {
    var url = this.props.httpServer;
    axios.get(url).then(result => {
      console.log(result.data);
      this.setState({ messages: result.data });
    })
  }

  connectToWebSocket() {
    var socket = this.props.webSocketServer;

    socket.on('connect', () => {
      socket.on('message', (message) => {
        console.log('message received:', message);
        this.setState({messages: this.state.messages.concat(JSON.parse(message))});
      });
    });
  }

  scrollToBottom() {
    var msgs = document.getElementsByClassName('message-list')[0];
    msgs.scrollTop = msgs.scrollHeight;
  }

  sendNewMessage(messageText) {
    var ws = this.props.webSocketServer;

    var message = {
      username: this.state.username,
      text: messageText,
      room: this.state.room
    };

    console.log('message sending:', messageText);
    ws.send(JSON.stringify(message));
  }



  render() {
  return (
    <div className='app-container'>
      <nav>
        <img src='logo.png' className='logo' />
      </nav>
      <MessageList messages = {this.state.messages}/>
      <UserInput sendNewMessage={this.sendNewMessage.bind(this)}/>
      <div className='footer'>
        <img src='footer.png' className='footer-logo' />
      </div>
    </div>
  );
  }
}

App.displayName = 'App';
export default App;
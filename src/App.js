import React, { Component } from 'react';
import './style.css';
import MessageList from './MessageList.js';
import UserInput from './UserInput.js';
import axios from 'axios';

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

  fetchPrevMessages() {
    var url = this.props.httpServer;
    axios.get(url).then(result => {
      console.log(result.data);
      this.setState({ messages: result.data });
    })
  }

  connectToWebSocket() {
    var ws = this.props.webSocketServer;

    ws.onopen = () => {
      ws.onmessage = (e) => {
        var message 
        console.log('message received:', e.data);
        this.setState({messages: this.state.messages.concat(JSON.parse(e.data))});
      }
    };
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

export default App;
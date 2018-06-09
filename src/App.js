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
  }

  fetchPrevMessages() {
    var url = window.location.origin + '/messages';
    axios.get(url).then(result => {
      console.log(result.data);
      this.setState({ messages: result.data });
    })
  }

  render() {
    return <MessageList messages = {this.state.messages}/>;
  }
}

export default App;
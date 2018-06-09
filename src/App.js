import React, {
  Component
} from 'react';
import './style.css';
import MessageList from './MessageList.js';

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
    this.setState({messages: sampleData});
  }

  render() {
    return <MessageList messages = {this.state.messages}/>;
  }
}

export default App;
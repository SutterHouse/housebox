import React, {
  Component
} from 'react';
import './style.css';
import Messages from './MessageList.js';

let sampleData = [{
    user: 'testuser1',
    message: 'hello!'
  },
  {
    user: 'testuser2',
    message: 'hey?'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.setState({messages: sampleData});
  }

  render() {
    return ( 
    <div>
      <MessageList messages = {this.props.messages}/> </div>
    );
  }
}

export default App;
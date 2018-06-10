import React, { Component } from 'react';
import './style.css';
import Message from './Message.js';

const MessageList = (props) => (

  <div className='messageList-container'>
    {props.messages.map((message, index) =>
      <div className='message' key={index}>
        <Message message={message} index={index} />
      </div>
    )}
  </div>

)


export default MessageList;
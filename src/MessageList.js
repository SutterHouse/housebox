import React, { Component } from 'react';
import './style.css';
import Message from './Message.js';

const MessageList = (props) => (

  <div className='message-list-container'>
    <div className='message-list'>
      {props.messages.map((message, index) =>
          <Message message={message} key={index} />
      )}
    </div>
  </div>

)

MessageList.displayName = 'MessageList';
export default MessageList;
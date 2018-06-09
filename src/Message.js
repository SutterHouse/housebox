import React, { Component } from 'react';
import './style.css';

const Message = (props) => (
  <div>
    <div className='message-container'>
      { props.message.username }: { props.message.text }
    </div>
  </div>
)


export default Message;
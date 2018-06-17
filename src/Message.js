import React, { Component } from 'react';
import './style.css';

const Message = (props) => (
  <div className='message-container'>
    { props.message.username }: { props.message.text }
  </div>
)


export default Message;
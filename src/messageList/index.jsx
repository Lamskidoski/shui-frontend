import React from 'react';
import MessageItem from '../messageItem'; // Import the MessageItem component for displaying individual messages

// MessageList component takes in two props: 
// 1. 'messages' (an array of messages) 
// 2. 'setMessages' (a function to update the messages array)
const MessageList = ({ messages, setMessages }) => {
  
  // Sorts the messages by creation date (from oldest to newest)
  const sortedMessages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <ul>
      {messages.map((message) => (
        <MessageItem
        key={message.id}
        message={message}
        messages={messages}
        setMessages={setMessages}
         />
      ))}
    </ul>
  );
};

export default MessageList;


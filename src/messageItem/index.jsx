
import React, { useState } from 'react';
import axios from 'axios';
// import '../MessageItem';

const MessageItem = ({ message, messages, setMessages }) => {
  const [isEditing, setIsEditing] = useState(false);  // Toggles the edit mode
  const [username, setUsername] = useState(message.username);  // Manages the username input
  const [text, setText] = useState(message.text);  // Manages the message text input

  const handleEdit = async (e) => {
    e.preventDefault();  // Prevents the default form submission behavior
    
    const updatedMessage = { 
      username: username.trim(),  // Trim input values to remove whitespace
      text: text.trim(), 
      createdAt: new Date().toISOString()  // Sets the updated time
    };

    try {
      // Update URL with the correct message.id
      const response = await axios.put(`https://cx2tiugwdj.execute-api.eu-north-1.amazonaws.com/message/${message.id}`, updatedMessage);
      console.log('Message updated:', response.data);
      
      // Update the local message list with the edited message
      const updatedMessages = messages.map((msg) =>
        msg.id === message.id ? { ...msg, ...updatedMessage } : msg
      );
      setMessages(updatedMessages);
      setIsEditing(false);  // Exit the edit mode after saving
    } catch (error) {
      console.error('Error updating message:', error);  // Log any errors during the update
    }
  };

  return (
    <li className='Message-items'>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          />
          <button type="submit">Spara</button>
          <button type="button" onClick={() => setIsEditing(false)}>Avbryt</button>
        </form>
      ) : (
        <>
          <span className='username'><strong className='strong'>{message.username}</strong>: <em>{message.text}</em> {new Date(message.createdAt).toLocaleString()}</span>
          <button onClick={() => setIsEditing(true)}>Ändra</button>
        </>
      )}
    </li>
  );
};

export default MessageItem;

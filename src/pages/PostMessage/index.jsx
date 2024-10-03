import React, { useState } from 'react'; // Importing necessary hooks and libraries
import axios from 'axios'; 

const PostMessage = ({ setMessages }) => {
  // Local state to hold the username and message text
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  // Function to post a message to the API
  const postMessage = async (message) => {
    try {
      // Making a POST request to the API to add a new message
      const response = await axios.post('https://cx2tiugwdj.execute-api.eu-north-1.amazonaws.com/message', message);
      console.log('Message posted:', response.data); // Log the posted message for debugging
      
      // Fetch updated messages from the API after posting
      const updatedMessages = await axios.get('https://cx2tiugwdj.execute-api.eu-north-1.amazonaws.com/message');
      setMessages(updatedMessages.data.data); // Update the state with the new messages
    } catch (error) {
      console.error('Error posting message:', error); 
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const message = { 
      username: username.trim(), 
      text: text.trim(), 
      createdAt: new Date().toISOString() // Get the current date and time
    };
    await postMessage(message); // Post the message to the API
    setUsername(''); // Reset the username input
    setText(''); // Reset the text input
  };

  return (
    <form className='form' onSubmit={handleSubmit}> {/* Form for submitting new messages */}
      <input 
        className='username'
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        placeholder="Användarnamn" 
        required // Input is required
      />
      <textarea 
      className='text'
        value={text} 
        onChange={(e) => setText(e.target.value)} // Update text state on input change
        placeholder="Skriv ditt meddelande" 
        required // Input is required
      />
      <button type="submit">Skicka</button> {/* Button to submit the form */}
    </form>
  );
};

export default PostMessage;
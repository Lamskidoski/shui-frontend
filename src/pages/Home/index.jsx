import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios is used to make HTTP requests
import MessageList from '../../MessageList/index.jsx'; // Importing MessageList component to display messages
import PostMessage from '../../pages/PostMessage/index.jsx'; // Importing PostMessage component to post new messages

const Home = () => {
  const [messages, setMessages] = useState([]); // State to hold the list of messages

  // useEffect hook to fetch messages from the API when the component is mounted
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Making GET request to the API to retrieve all messages
        const response = await axios.get("https://cx2tiugwdj.execute-api.eu-north-1.amazonaws.com/message");
        console.log('API Response:', response.data); // Log API response for debugging
        setMessages(response.data.data); // Update the 'messages' state with the retrieved data
      } catch (error) {
        console.error("Error fetching messages:", error); // Log error if request fails
      }
    };

    fetchMessages(); // Trigger the function to fetch messages
  }, []); // Empty dependency array means this effect runs only once, when the component mounts

  return (
    <div>
      <h1>Shiu-exam</h1> 
      <h2>Meddelanden</h2> 
      <MessageList messages={messages} setMessages={setMessages} /> 
      <PostMessage setMessages={setMessages} messages={messages}/> 
    </div>
  );
};

export default Home;
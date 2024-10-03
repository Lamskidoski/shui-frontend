import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import PostMessage from './pages/PostMessage/index.jsx';
import './App.css';
import './styles/GlobalStyles.css'; 
import './styles/MessageList.css';
import './styles/MessageItem.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostMessage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

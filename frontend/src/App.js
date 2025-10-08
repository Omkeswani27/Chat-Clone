import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import HelpPage from './components/Contact';
import ChatPage from './components/ChatPage';
import UserListPage from './components/UserListPage';
import FAQPage from './components/FAQPage';
import Contact from './components/Contact';
import AboutUsPage from './components/AboutUsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/Contact" element={<Contact />} />  
        <Route path="/ChatPage" element={<ChatPage />} /> 
        <Route path="/chat/:id" element={<UserListPage />} /> 
        <Route path="/FAQPage" element={<FAQPage />} /> 
        <Route path="/about" element={<AboutUsPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;

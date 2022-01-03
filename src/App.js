import './App.css';
import Login from './Screens/Login';
import Adminpanel from './Screens/Adminpanel';
import Admindashboard from './Screens/admindashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpanel" element={<Adminpanel />} />
           <Route path="/admindashboard" element={<Admindashboard />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

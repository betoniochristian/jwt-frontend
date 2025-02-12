import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./pages/Header/Header";  // Default Header
import LoginHeader from "./pages/Header/LoginHeader";  
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from './pages/Register/Register';
import PostEmployee from './pages/Employee/PostEmployee';
import UpdateEmployee from "./pages/Employee/UpdateEmployee";

function App() {
  const location = useLocation(); 

  const showDashboardHeader = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/employee');

  return (
    <>
      {showDashboardHeader ? <Header /> : <LoginHeader />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee" element={<PostEmployee />} />
        <Route path="/employee/:id" element={<UpdateEmployee />} />
      </Routes>
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { getCurrentUser } from './services/login';
function App() {

  const[user, setUser] = useState(undefined) 

  useEffect(() => {
      const userLocal = getCurrentUser()
      if(userLocal){
        setUser(userLocal);
      }
  }, [])

  console.log("user",user)
  return (
    <div className='min-h-dvh bg-bg-100 flex items-center'>
      <Routes>
        {user ? (
          <Route path="/" element={<Layout user = {user}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        ) : (
          <Route path="/login" element={<Login setUser={setUser} />} />
          )}
          <Route path="*" element={user ? <Navigate to = "/"/> :  <Navigate to ="/login" /> } />
      </Routes>
    </div>
  );
}
export default App

import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React from 'react'
import NavBar from './components/common/NavBar';
import Body from './components/core/Body';
import Login from './components/core/Login';
import Profile from './components/core/Profile';

function App() {
  return (
    <div>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App;

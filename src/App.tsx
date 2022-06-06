import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Profile from "./components/Profile";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Page404 from "./components/Page404";
import PasswordRecovery from "./components/PasswordRecovery";
import PasswordNew from "./components/PasswordNew";
import Examples from "./components/Examples";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/registration'} element={<Registration/>}/>
        <Route path={'/404'} element={ <Page404/>}/>
        <Route path={'/passwordrecovery'} element={<PasswordRecovery/>}/>
        <Route path={'/passwordnew/'} element={<PasswordNew/>}/>
        <Route path={'/tests'} element={<Examples/>}/>
      </Routes>
    </div>
  );
}

export default App;

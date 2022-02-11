import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import SignUp from '../Components/Signup/SignUp';

interface IRoutesProps {
}

const Router: React.FunctionComponent<IRoutesProps> = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

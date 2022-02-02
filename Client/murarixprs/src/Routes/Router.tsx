import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';

interface IRoutesProps {
}

const Router: React.FunctionComponent<IRoutesProps> = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

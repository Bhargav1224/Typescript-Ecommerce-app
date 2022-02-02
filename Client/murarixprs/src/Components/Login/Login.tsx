import * as React from "react";
import { useState } from "react";
import { LoginModel } from "../models/login.model";
import LoginInput from "./LoginInput";

const initialState = {
  email: "",
  password: "",
};
const Login: React.FunctionComponent = (props) => {
  const [loginData, setLoginData] = useState<LoginModel>(initialState || "");

  return (
    <>
      <h1> Welcome to Login Page</h1>
      <LoginInput loginData={loginData} setLoginData={setLoginData} />
    </>
  );
};

export default Login;

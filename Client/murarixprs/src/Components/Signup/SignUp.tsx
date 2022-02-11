import * as React from "react";
import { useState } from "react";
import { SignUpModel } from "../models/signup.model";
import SignUpInput from "./SignUpInput";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const SignUp: React.FunctionComponent = (props) => {
  const [signUpData, setSignUpData] = useState<SignUpModel>(initialState || "");

  return (
    <>
      <SignUpInput signUpData={signUpData} setSignUpData={setSignUpData} />
    </>
  );
};

export default SignUp;

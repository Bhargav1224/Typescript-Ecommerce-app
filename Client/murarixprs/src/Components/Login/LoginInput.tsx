import * as React from 'react';
import { LoginModel } from '../models/login.model';

interface ILoginInputProps {
  loginData: LoginModel;
  setLoginData: React.Dispatch<React.SetStateAction<LoginModel>>;
}

const LoginInput: React.FunctionComponent<ILoginInputProps> = ({
  loginData,
  setLoginData,
}) => {
  const { email, password } = loginData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(loginData);
  };
  return (
    <>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
          type="email"
          required
          placeholder="Add something...!"
        />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          required
          placeholder="Add something...!"
        />
        <button type="submit">L o g i n</button>
      </form>
    </>
  );
};

export default LoginInput;

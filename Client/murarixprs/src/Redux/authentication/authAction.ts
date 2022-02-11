import axios from "axios";
import {
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
} from "./authActionTypes";

//signup part
export const signupLoading = () => ({
  type: AUTH_SIGNUP_REQUEST,
});

export const signupSuccess = (payload: any) => ({
  type: AUTH_SIGNUP_SUCCESS,
  payload,
});
export const signupFailure = (payload: any) => ({
  type: AUTH_SIGNUP_FAILURE,
  payload,
});

export const loginLoading = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const loginSuccess = (payload: any) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload,
});
export const loginFailure = (payload: any) => ({
  type: AUTH_LOGIN_FAILURE,
  payload,
});


export const logoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const authSignUp = (payload: any) => (dispatch: any) => {
  //we are dispatching the request  action here
  const requestAction = signupLoading();
  dispatch(requestAction);
  return axios
    .post("http://localhost:8001/auth/user/signup", payload)
    .then((res) => {
      //dispatching success action here
      const successAction = signupSuccess(res.data);
      dispatch(successAction);
      console.log(res.data);
    })
    .catch((error) => {
      //dispatching error action here
      const failureAction = signupFailure(error);
      dispatch(failureAction);
    });
};

export const authLogin = (payload: any) => (dispatch: any) => {
  //we are dispatching the request  action here
  const requestAction = loginLoading();
  dispatch(requestAction);
  return axios
    .post("http://localhost:8001/auth/user/login", payload)
    .then((res) => {
      //dispatching success action here
      const successAction = loginSuccess(res?.data);
      dispatch(successAction);
    })
    .catch((error) => {
      //dispatching error action here
      const failureAction = loginFailure(error);
      dispatch(failureAction);
    });
};
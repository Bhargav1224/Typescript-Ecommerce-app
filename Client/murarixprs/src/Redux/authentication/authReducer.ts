import { getLocalData, setLocalData } from "../../Utilis/localStorage";
// import type { RootState } from "../store";
import {
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
} from "./authActionTypes";

// Define a type for the slice state
interface InitState {
  signUpSuccess: boolean;
  signUpFailure: boolean;
  signUpLoading: boolean;
  signUpData: Array<any>;
  loginSuccess: boolean;
  token: string;
  loginFailure: boolean;
  loginLoading: boolean;
  loginData: Array<any>;
  failureData: string;
  logoutSuccess: boolean;
}

const InitialState: InitState = {
  signUpSuccess: false,
  signUpFailure: false,
  signUpLoading: false,
  signUpData: [],
  loginSuccess: getLocalData("isAuth") || false,
  token: getLocalData("token") || "",
  loginFailure: false,
  loginLoading: false,
  loginData: [],
  failureData: "",
  logoutSuccess: false,
};

export const authReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case AUTH_SIGNUP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: true,
        signUpFailure: false,
        signUpData: action.payload,
      };
    case AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpFailure: true,
        failureData: action.payload,
      };
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      setLocalData("isAuth", true);
      setLocalData("token", action.payload.accessToken);
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        token: action.payload,
        loginFailure: false,
        loginData: action.payload,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginFailure: true,
        failureData: action.payload,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loginSuccess: false,
        logoutSuccess: true,
      };
    default:
      return state;
  }
};

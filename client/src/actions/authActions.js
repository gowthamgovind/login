import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  VALIDATE_MOBILE, SET_GENERATE, GET_USERS} from "./types";
import setAuthToken from "../utils/setAuthToken";

import jwt_decode from "jwt-decode";
export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      //set to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set to auth header
      setAuthToken(token);

      //decode
      const decoded = jwt_decode(token);
      //set current user
      
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const signupUser = userData => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => {
      //set to local storage
      window.location.href = "/";
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //set to auth header
      setAuthToken(token);

      //decode
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const loginUserMobile = userDataMobile => dispatch => { 

  axios.post('/api/auth/mobilelogin', 
  {
    mobileNumber: userDataMobile
  })
    .then(res => {
      if(res.status === 200){
        const status = res.status;
        dispatch(validateMobile(status)); 
        dispatch(setGenerate(res.data))
      }
      else{
        const status = res.status;
        dispatch(validateMobile(status)); 
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        })
      }
      })
    .catch(err => {
      
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

export const otp = userDataOtp => dispatch => {
  axios
    .post("/api/auth/otpValidate", userDataOtp)
    .then((res,err) => {
      
      //set to local storage

      const { token } = res.data;
      
      if(res.status === 200 && token !== undefined)
      {
      localStorage.setItem("jwtToken", token);
      window.location.href = "/";
      //set to auth header
      setAuthToken(token);

      //decode
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      }
      else{
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        })
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setGenerate = data => {
  return {
    type: SET_GENERATE,
    payload: data
  };
}

export const validateMobile = data => { 
  return {
    type: VALIDATE_MOBILE,
    payload: data
  };
};

export const getUsers = () => dispatch => {
  axios
    .get("/api/users/getusers")
    .then(response => {
      if (response.status === 200 && response.data.length !== 0) {        
        dispatch(userList(response.data))
      } else {
        dispatch(userList(response.data))
      }
    })
    .catch(function (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

export const userList = data => {
  return {
    type: GET_USERS,
    payload: data
  };
};
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

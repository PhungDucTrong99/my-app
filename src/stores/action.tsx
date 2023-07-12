import { v4 as uuidv4 } from "uuid";

export const addUsers = (data: any) => {
  return {
    type: "user/addUsers",
    payload: data,
  };
};

export const _saveQuestion = (data: any) => {
  return (dispatch: any) => {
    return new Promise<string>((resolve, reject) => {
      const id = uuidv4().toString();
      dispatch({
        type: "user/addQuestion",
        payload: {
          ...data,
          id: id,
        },
      });
      resolve(id);
    });
  };
};

export const _saveQuestionAnswer = (data: any) => {
  return (dispatch: any) => {
    return new Promise<string | void>((resolve, reject) => {
      dispatch({
        type: "user/handleAnswer",
        payload: data,
      });
      resolve();
    });
  };
};

export const isLogin = (id: any) => {
  return {
    type: "user/isLogin",
    payload: id,
  };
};

export const isLogout = (id: any) => {
  return {
    type: "user/isLogout",
    payload: id,
  };
};

export const Login = (payload: any) => {
  return (dispatch: any) => {
    return new Promise<string | void>((resolve, reject) => {
      dispatch({
        type: "user/Login",
        payload: { username: payload.username, password: payload.password },
      });
      resolve();
    });
  };
};

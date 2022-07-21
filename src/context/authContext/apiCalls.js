import axiosClient from "../../apiconfig/apiConfig";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

// Authentification
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosClient.post("auths/signin", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

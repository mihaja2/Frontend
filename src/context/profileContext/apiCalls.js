import axiosClient from "../../apiconfig/apiConfig";
import {
  createProfileFailure,
  createProfileStart,
  createProfileSuccess,
  deleteProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  getProfileFailure,
  getProfileStart,
  getProfileSuccess,
} from "./ProfileActions";
import Swal from "sweetalert2";
import { logout } from "../authContext/AuthActions";

export const getProfileByme = async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await axiosClient.get("/profiles/me", {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailure());
  }
};

export const getProfileById = async (id) => {
  try {
    const res = await axiosClient.get("/profiles/" + id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return res.data;
  } catch (err) {
    console.log("veuillez vous connectez");
  }
};

//create
export const createProfile = async (profile, dispatch) => {
  dispatch(createProfileStart());
  try {
    const res = await axiosClient.post("/profiles/profile", profile, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
        "Content-type": "multipart/form-data",
      },
    });
    dispatch(createProfileSuccess(res.data));
    Swal.fire({
      icon:"success",
      text:"Profile Updated!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(createProfileFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Create profile!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//delete
export const deleteProfile = async (id, dispatch) => {
  dispatch(deleteProfileStart());
  try {
    await axiosClient.delete("/profiles/" + id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteProfileSuccess(id));
    Swal.fire({
      icon:"success",
      text:"Profile Deleted!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(deleteProfileFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Delete profile!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};


// delete user
export const deleteCurrent = async (dispatch) => {
  try {
    
    await axiosClient({
      method: 'delete',
      url: "/users/me",
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    Swal.fire({
      icon:"success",
      text:"User Deleted!",
      timer: 3000,
      showConfirmButton:false 
    });
    dispatch(logout());
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Delete user!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};
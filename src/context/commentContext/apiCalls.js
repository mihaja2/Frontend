import axiosClient from "../../apiconfig/apiConfig";
import {
  createCommentFailure,
  createCommentStart,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  updateCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
} from "./CommentsActions";
import Swal from "sweetalert2";

export const getComments = async (id) => {
  try {
    const res = await axiosClient.get("/comments/"+id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return res.data;
  } catch (err) {
  }
};

//create
export const createComment = async (id,post, dispatch) => {
  dispatch(createCommentStart());
  try {
    const res = await axiosClient.post("/comments/"+id, post, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
        //"Content-type": "multipart/form-data",
      },
    });
    dispatch(createCommentSuccess(res.data));
    Swal.fire({
      icon:"success",
      text:"Comment Created!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(createCommentFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Create comment!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//update
export const updateComment = async (id, mess, dispatch) => {
  dispatch(updateCommentStart());
  try {
    await axiosClient.put("/comments/" + id, mess,{
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(updateCommentSuccess(id));
    Swal.fire({
      icon:"success",
      text:"Comment Updated!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(updateCommentFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Update Comment!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//delete
export const deleteComment = async (id, dispatch) => {
  dispatch(deleteCommentStart());
  try {
    await axiosClient.delete("/comments/" + id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteCommentSuccess(id));
    Swal.fire({
      icon:"success",
      text:"Comment Deleted!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(deleteCommentFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Delete Comment!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};


//like
export const likePostC = async (id) => {
  try {
    await axiosClient({
      method: 'post',
      url: "/toggle_commentlike/" + id,
      data: {
      },
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const getlikePostC = async (id) => {
  try {
    const res = await axiosClient({
      method: 'get',
      url: "/toggle_commentlike/" + id,
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
import axiosClient from "../../apiconfig/apiConfig";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
  updatePostFailure,
  updatePostStart,
  updatePostSuccess,
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
} from "./PostsActions";
import Swal from "sweetalert2";

//Get all posts
export const getPosts = async (dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await axiosClient.get("/posts", {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

// Get all posts for a user Id
export const getPostsByme = async (id,dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await axiosClient.get("/posts/user/"+id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

// Get post by Id
export const getPostsById = async (id) => {
  try {
      const res = await axiosClient.get("/posts/" + id, {
        headers: {
          'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
        },
      });
      return res.data;
    
  } catch (err) {
    console.log(err);
  }
};

//create a post
export const createPost = async (post, dispatch) => {
  dispatch(createPostStart());
  try {
    const res = await axiosClient.post("/posts/post", post, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
        "Content-type": "multipart/form-data",
      },
    });
    dispatch(createPostSuccess(res.data));
    Swal.fire({
      icon:"success",
      text:"Post Created!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(createPostFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Create post!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//update a post
export const updatePost = async (id, message, dispatch) => {
  dispatch(updatePostStart());
  try {
    await axiosClient.put("/posts/post/" + id, message,{
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
        "Content-type": "multipart/form-data",
      },
    });
    dispatch(updatePostSuccess(id));
    Swal.fire({
      icon:"success",
      text:"Post Updated!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(updatePostFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Update post!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//delete a post
export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
    await axiosClient.delete("/posts/" + id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deletePostSuccess(id));
    Swal.fire({
      icon:"success",
      text:"Post Deleted!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    dispatch(deletePostFailure());
    Swal.fire({
      icon:"error",
      text:"Fail to Delete post!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//like or unlike
export const likePost = async (id) => {
  try {
    await axiosClient({
      method: 'post',
      url: "/toggle_postlike/" + id,
      data: {
      },
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//See all users who liked a post
export const getlikePost = async (id) => {
  try {
    const res = await axiosClient({
      method: 'get',
      url: "/toggle_postlike/" + id,
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
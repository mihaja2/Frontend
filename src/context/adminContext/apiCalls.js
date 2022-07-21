import axiosClient from "../../apiconfig/apiConfig";
import Swal from "sweetalert2";

// Get all user that are not an admin
export const getAllUser = async () => {
    try {
        const res = await axiosClient.get("/admin/users", {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
          },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createUserAdmin = async () => {
    try {
        const res = await axiosClient.post("/admin/createUser");
        console.log(res.data);
    } catch (err) {
      console.log(err);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await axiosClient.delete("/admin/user/"+id, {
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
    } catch (err) {
      Swal.fire({
        icon:"error",
        text:"Fail to Delete User!", 
        timer: 3000,
        showConfirmButton:false
      });
    }
};

//delete
export const deletePostByAdmin = async (id) => {
  try {
    await axiosClient.delete("/admin/post/" + id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    Swal.fire({
      icon:"success",
      text:"Post Deleted!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Delete post!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//update
export const updatePostByAdmin = async (id, message) => {
  try {
    await axiosClient.put("/admin/modify/post/post/" + id, message,{
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
        "Content-type": "multipart/form-data",
      },
    });
    Swal.fire({
      icon:"success",
      text:"Post Updated!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Update post!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//update
export const updateCommentByAdmin = async (id,message) => {
  try {
    await axiosClient.put("/admin/modify/comment/" + id, message,{
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    Swal.fire({
      icon:"success",
      text:"Comment Updated!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Update Comment!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//update
export const changePassEmailForAdmin = async (pass) => {
  try {
    console.log(pass);
    await axiosClient.put('/admin/me', pass, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    Swal.fire({
      icon:"success",
      text:"Successfully Changed!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Change Default acount!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//update
export const resetPasswordByAdmin = async (id,pass) => {
  try {
    await axiosClient.put('/admin/changePassword/'+id, pass, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    Swal.fire({
      icon:"success",
      text:"Password Reseted!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Reset Password!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};

//delete
export const deleteCommentByAdmin = async (id) => {
  try {
    await axiosClient.delete("/admin/comment/" + id, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
      },
    });
    Swal.fire({
      icon:"success",
      text:"Comment Deleted!",
      timer: 3000,
      showConfirmButton:false 
    });
  } catch (err) {
    Swal.fire({
      icon:"error",
      text:"Fail to Delete Comment!", 
      timer: 3000,
      showConfirmButton:false
    });
  }
};
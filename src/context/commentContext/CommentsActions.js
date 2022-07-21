export const getCommentsStart = () => ({
  type: "GET_COMMENTS_START",
});

export const getCommentsSuccess = (posts) => ({
  type: "GET_COMMENTS_SUCCESS",
  payload: posts,
});

export const getCommentsFailure = () => ({
  type: "GET_COMMENTS_FAILURE",
});

export const createCommentStart = () => ({
  type: "CREATE_COMMENT_START",
});

export const createCommentSuccess = (post) => ({
  type: "CREATE_COMMENT_SUCCESS",
  payload: post,
});

export const createCommentFailure = () => ({
  type: "CREATE_COMMENT_FAILURE",
});

export const updateCommentStart = () => ({
  type: "UPDATE_COMMENT_START",
});

export const updateCommentSuccess = (post) => ({
  type: "UPDATE_COMMENT_SUCCESS",
  payload: post,
});

export const updateCommentFailure = () => ({
  type: "UPDATE_COMMENT_FAILURE",
});

export const deleteCommentStart = () => ({
  type: "DELETE_COMMENT_START",
});

export const deleteCommentSuccess = (id) => ({
  type: "DELETE_COMMENT_SUCCESS",
  payload: id,
});

export const deleteCommentFailure = () => ({
  type: "DELETE_COMMENT_FAILURE",
});

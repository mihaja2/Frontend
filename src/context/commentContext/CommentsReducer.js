const CommentsReducer = (state, action) => {
  switch (action.type) {
    case "GET_COMMENTS_START":
      return {
        comments: [],
        isFetching: true,
        error: false,
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        comments: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_COMMENTS_FAILURE":
      return {
        comments: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_COMMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_COMMENT_SUCCESS":
      return {
        comments: [...state.comments, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_COMMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_COMMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_COMMENT_SUCCESS":
      return {
        comments: state.comments.filter((post) => post._id === action.payload),
        isFetching: false,
        error: false,
      };
    case "UPDATE_COMMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_COMMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_COMMENT_SUCCESS":
      return {
        comments: state.comments.filter((post) => post._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_COMMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CommentsReducer;

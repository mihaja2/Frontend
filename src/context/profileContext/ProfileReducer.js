const ProfileReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROFILE_START":
      return {
        profile: [],
        isFetching: true,
        error: false,
      };
    case "GET_PROFILE_SUCCESS":
      return {
        profile: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_PROFILE_FAILURE":
      return {
        profile: [],
        isFetching: false,
        error: true,
      };
      case "GET_PROFILE_BY_ID_START":
      return {
        profile: [],
        isFetching: true,
        error: false,
      };
    case "GET_PROFILE_BY_ID_SUCCESS":
      return {
        profile: state.profile.filter((prof) => prof._id === action.payload),
        isFetching: false,
        error: false,
      };
    case "GET_PROFILE_BY_ID_FAILURE":
      return {
        profile: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_PROFILE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_PROFILE_SUCCESS":
      return {
        profile: [...state.profile, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_PROFILE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_PROFILE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_PROFILE_SUCCESS":
      return {
        profile: state.profile.filter((prof) => prof._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_PROFILE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ProfileReducer;

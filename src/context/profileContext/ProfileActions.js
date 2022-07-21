export const getProfileStart = () => ({
  type: "GET_PROFILE_START",
});

export const getProfileSuccess = (profile) => ({
  type: "GET_PROFILE_SUCCESS",
  payload: profile,
});

export const getProfileByIdFailure = () => ({
  type: "GET_PROFILE_FAILURE",
});

export const getProfileByIdStart = () => ({
  type: "GET_PROFILE_BY_START",
});

export const getProfileByIdSuccess = (profile) => ({
  type: "GET_PROFILE_BY_SUCCESS",
  payload: profile,
});

export const getProfileFailure = () => ({
  type: "GET_PROFILE_BY_FAILURE",
});

export const createProfileStart = () => ({
  type: "CREATE_PROFILE_START",
});

export const createProfileSuccess = (profile) => ({
  type: "CREATE_PROFILE_SUCCESS",
  payload: profile,
});

export const createProfileFailure = () => ({
  type: "CREATE_PROFILE_FAILURE",
});

export const deleteProfileStart = () => ({
  type: "DELETE_PROFILE_START",
});

export const deleteProfileSuccess = (id) => ({
  type: "DELETE_PROFILE_SUCCESS",
  payload: id,
});

export const deleteProfileFailure = () => ({
  type: "DELETE_PROFILE_FAILURE",
});

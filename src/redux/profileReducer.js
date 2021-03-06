import { profileAPI } from "api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";

let initialState = {
  postsData: [
    {
      id: 0,
      text: "Post1",
      link:
        "https://peopletalk.ru/files/articles/6/5253/s5_8dad37e82e74f542e022285ff451078f.jpg",
      number: 6,
    },
    {
      id: 1,
      text: "PewPew One Two Three",
      link: "https://www.kino-teatr.ru/movie/posters/big/8/36398.jpg",
      number: 10,
    },
    { id: 2, text: "Post3", number: 155 },
    { id: 3, text: "234234", number: 213 },
  ],
  updateNewText: "",
  profile: null,
  status: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.postsData.length,
        text: state.updateNewText,
        number: 0,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        updateNewText: "",
      };

    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        updateNewText: action.newText,
      };
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_PROFILE_PHOTO: {
      debugger;
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    default:
      return state;
  }
};

export const addNewPost = () => ({ type: ADD_POST });
export const updateNewPostText = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});
export const setProfilePhoto = (photos) => ({
  type: SET_PROFILE_PHOTO,
  photos,
});
export const getUserProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getUserProfile(userId);
  dispatch(setUserProfile(data));
};
export const getUserStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatus(data));
};
export const updateUserStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateUserStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};
export const updateProfilePhoto = (photo) => async (dispatch) => {
  const data = await profileAPI.saveProfilePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(setProfilePhoto(data.data.photos));
  }
};
export const updateUserData = (data) => async (dispatch) => {
  const response = await profileAPI.updateUserData(data);
  if (response.resultCode === 0) {
    dispatch(getUserProfile(data.userId));
  }
};

export { profileReducer };

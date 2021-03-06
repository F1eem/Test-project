import { userAPI } from "api/api";

const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

const initialState = {
  users: [],
  totalCount: "",
  currentPage: 1,
  pageSize: 15,
  isFetching: false,
  toggleFollowingProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: state.users.map((e) => {
          if (e.id === action.usersId) {
            return { ...e, followed: !e.followed };
          }
          return e;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        toggleFollowingProgress: action.isFetching
          ? [...state.toggleFollowingProgress, action.userId]
          : state.toggleFollowingProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});
export const toggleFollow = (usersId) => ({
  type: TOGGLE_FOLLOW,
  usersId,
});
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  totalCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});
export const getUser = (pageSize, currentPage) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const data = await userAPI.getUsers(pageSize, currentPage);
  dispatch(setUsers(data.items));
  dispatch(setTotalCount(data.totalCount));
  dispatch(toggleIsFetching(false));
};
export const delFollowSuccess = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await userAPI.delFollow(userId);
  if (data.resultCode === 0) {
    dispatch(toggleFollow(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};
export const addFollowSuccess = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await userAPI.addFollow(userId);
  if (data.resultCode === 0) {
    dispatch(toggleFollow(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export { usersReducer };

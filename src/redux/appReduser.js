import { getAuthData } from "./authReduser";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});
export const initializeApp = () => async (dispatch) => {
  let promise = dispatch(getAuthData());
  //dispatch(getAuthData());
  await Promise.all([promise]);
  dispatch(initializedSuccess());
};

export { appReducer };

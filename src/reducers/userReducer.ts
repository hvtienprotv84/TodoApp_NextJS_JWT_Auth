import * as actionTypes from "@/action-type/userActionTypes";
import { UserActions } from "@/actions/userActions";

export interface InitialStateType {
  isLogin: boolean;
  userName: string;
}

type UserReducerType = (
  state: InitialStateType,
  action: UserActions,
) => InitialStateType;

const initialState: InitialStateType = {
  isLogin: false,
  userName: "",
};

const userReducer: UserReducerType = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload as boolean,
      };
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        userName: action.payload as string,
      };
    default:
      return state;
  }
};

export default userReducer;

import { combineReducers, Reducer } from "@reduxjs/toolkit";
import appReducer, {
  InitialStateType as AppInitialStateType,
} from "./appReducer";
import userReducer, {
  InitialStateType as UserAppInitialStateType,
} from "./userReducer";
import { Tasks } from "@/actions/appActions";

type RootReducerType = Reducer<
  {
    app: AppInitialStateType;
    user: UserAppInitialStateType;
  },
  | {
      payload: string | boolean;
      type: string;
    }
  | {
      payload: boolean | Tasks[];
      type: string;
    }
>;

const rootReducer: RootReducerType = combineReducers({
  app: appReducer,
  user: userReducer,
});

export default rootReducer;

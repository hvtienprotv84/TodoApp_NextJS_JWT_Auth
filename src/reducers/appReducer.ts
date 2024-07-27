import * as actionTypes from "../action-type/appActionTypes";
import { AppActions, Tasks } from "@/actions/appActions";

export interface InitialStateType {
  modal: boolean;
  menu: boolean;
  editModal: boolean;
  tasks: Tasks[];
  completed: Tasks[];
  important: Tasks[];
  inCompleted: Tasks[];
}

type AppReducerType = (
  state: InitialStateType,
  action: AppActions,
) => InitialStateType;

const initialState: InitialStateType = {
  modal: false,
  menu: false,
  editModal: false,
  tasks: [],
  completed: [],
  important: [],
  inCompleted: [],
};

const appReducer: AppReducerType = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload as boolean,
      };
    case actionTypes.TOGGLE_MENU:
      return {
        ...state,
        menu: action.payload as boolean,
      };
    case actionTypes.SET_TASKS:
      return {
        ...state,
        tasks: action.payload as Tasks[],
      };
    case actionTypes.SET_COMPLETED:
      return {
        ...state,
        completed: action.payload as Tasks[],
      };
    case actionTypes.SET_IMPORTANT:
      return {
        ...state,
        important: action.payload as Tasks[],
      };
    case actionTypes.SET_INCOMPLETED:
      return {
        ...state,
        inCompleted: action.payload as Tasks[],
      };
    case actionTypes.TOGGLE_EDIT_MODAL:
      return {
        ...state,
        editModal: action.payload as boolean,
      };
    default:
      return { ...state };
  }
};

export default appReducer;

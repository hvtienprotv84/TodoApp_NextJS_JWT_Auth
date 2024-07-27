import * as actionTypes from "../action-type/appActionTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export interface Tasks {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
  date: string;
  createdAt: string;
  userName?: string;
}

export type AppActions = PayloadAction<boolean | Tasks[]>;

export const toggleModal = (modal: boolean): AppActions => ({
  type: actionTypes.TOGGLE_MODAL,
  payload: modal,
});

export const toggleMenu = (menu: boolean): AppActions => ({
  type: actionTypes.TOGGLE_MENU,
  payload: menu,
});

export const setTasks = (tasks: Tasks[]): AppActions => ({
  type: actionTypes.SET_TASKS,
  payload: tasks,
});

export const setCompleted = (completed: Tasks[]): AppActions => ({
  type: actionTypes.SET_COMPLETED,
  payload: completed,
});

export const setImportant = (important: Tasks[]): AppActions => ({
  type: actionTypes.SET_IMPORTANT,
  payload: important,
});

export const setInCompleted = (inCompleted: Tasks[]): AppActions => ({
  type: actionTypes.SET_INCOMPLETED,
  payload: inCompleted,
});

export const toggleEditModal = (editModal: boolean): AppActions => ({
  type: actionTypes.TOGGLE_EDIT_MODAL,
  payload: editModal,
});

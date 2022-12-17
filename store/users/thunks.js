import { loadUsers } from "../../helpers/loadUsers";

import {
  setUsers,
} from "./usersSlice";

export const startLoadingUsers = () => {
  return async (dispatch, getState) => {
    const users = await loadUsers();
    dispatch(setUsers(users));
  };
};
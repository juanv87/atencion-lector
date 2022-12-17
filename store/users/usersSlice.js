import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [
      {
        id: "",
        nickName: "",
        email: "",
        photoURL: "",
      },
    ],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsers
  // setValidarFromPreguntasByUserName,
} = usersSlice.actions;

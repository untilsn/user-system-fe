import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  isAdmin: false,
  phone: "",
  avatar: "",
  address: "",
  isAccountVerify: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      const { _id, name, email, isAdmin, phone, avatar, address, isAccountVerify } = action.payload;
      return {
        id: _id ?? state.id,
        name: name ?? state.name,
        email: email ?? state.email,
        isAdmin: isAdmin ?? state.isAdmin,
        phone: phone ?? state.phone,
        avatar: avatar ?? state.avatar,
        address: address ?? state.address,
        isAccountVerify: isAccountVerify ?? state.isAccountVerify,
      }
    },
    logoutUser: (state, action) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.isAdmin = false;
      state.phone = "";
      state.avatar = "";
      state.address = "";
      state.isAccountVerify = false;
    }
  },
});

export const { updateUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;

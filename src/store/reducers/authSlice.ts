import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../api/todolists-api";
import { LoginType } from "../../layout/login/Login";
import { handleServerAppErrors, handleServerNetworkError } from "../../utils";
import { AppThunk } from "../store";
import { setAppIsInitialized, setAppStatus } from "store/reducers/appSlice";


const authSlice = createSlice({
  name: "auth",

  initialState: {
  isLoggedIn: false,
	},

  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = authSlice.reducer
export const { setIsLoggedInAC } = authSlice.actions



//* Thunks
export const loginTC = (data: LoginType): AppThunk => {
  return async (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(
          setIsLoggedInAC({
            isLoggedIn: true,
          }),
        );
        dispatch(setAppStatus({status: "succeeded"}));
      } else {
        handleServerAppErrors(dispatch, res.data);
      }
    } catch (error) {
      handleServerNetworkError(
        dispatch,
        error as {
          message: string;
        },
      );
    }
  };
};

export const logoutTC = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
      const res = await authAPI.logout();
      if (res.data.resultCode === 0) {
        dispatch(
          setIsLoggedInAC({
            isLoggedIn: false,
          }),
        );
        dispatch(setAppStatus({status: "succeeded"}));
      } else {
        handleServerAppErrors(dispatch, res.data);
      }
    } catch (error) {
      handleServerNetworkError(
        dispatch,
        error as {
          message: string;
        },
      );
    }
  };
};

export const meTC = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === 0) {
        dispatch(
          setIsLoggedInAC({
            isLoggedIn: true,
          }),
        );

        dispatch(setAppStatus({status: "succeeded"}));
      } else {
        handleServerAppErrors(dispatch, res.data);
      }
    } catch (error) {
      handleServerNetworkError(
        dispatch,
        error as {
          message: string;
        },
      );
    }
    dispatch(setAppIsInitialized({isInitialized: true}));
  };
};

//* Types

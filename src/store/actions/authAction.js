import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";

// for register action
const registerAction = createAsyncThunk("/auth/register", async (formData) => {
  try {
    const { data } = await axiosPrivate.post("/api/auth/register", formData, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    return console.log("Error on register User", err.message);
  }
});

// for login action

const loginAction = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const { data } = await axiosPrivate.post("/api/auth/login", formData, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    return err.message;
  }
});

// for logout aciton
const logoutAction = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await axiosPrivate.post("/api/auth/logout", {}, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    return err.message;
  }
});

// for authentication

const checkAuthAction = createAsyncThunk("/auth/checkauth", async () => {
  try {
    const { data } = await axiosPrivate.get("/api/auth/check-auth", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    });
    console.log('datafrom chekAuthe', data);
    return data;
  } catch (err) {
    return console.log("Error on register User", err.message);
  }
});

export { registerAction, loginAction, logoutAction, checkAuthAction };

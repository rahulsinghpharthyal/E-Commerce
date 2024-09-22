import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";

const getAllusageApi = createAsyncThunk("/usageApi", async (_, {rejectWithValue}) => {
  try {
    const { data } = await axiosPrivate.get("/api/admin/usage-stats");
    return data.Data;
  } catch (err) {
    return rejectWithValue(err.response.data || err.message)
  }
});

export { getAllusageApi };

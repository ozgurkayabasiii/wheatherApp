import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = "af5d66f08988800b50dae22d37b142a2";
export const getWeahter = createAsyncThunk(
  "wheater/gerWheater",
  async (country) => {
    const res = await axios(
      `http://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${API_KEY}&units=metric&lang=tr`
    );
    console.log(res.data.list)
    return res.data;
  }
);
const wheaterSlice = createSlice({
  name: "weather",
  initialState: {
    items: [],
    status: "idle",
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getWeahter.fulfilled]: (state, action) => {
      state.items = action.payload.list;
      state.status='succeeded';
    },
    [getWeahter.pending]: (state, action) => {
      state.status = "loading";
    },
    [getWeahter.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default wheaterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  currentVideo: null,

  loading: false,
  error: null,

  uploadLoading: false,
  uploadError: null,
  uploadSuccess: false,
  isUploadSuccess: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchVideosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    fetchVideosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadVideoStart: (state) => {
      state.uploadLoading = true;
      state.uploadError = null;
      state.uploadSuccess = false;
    },
    uploadVideoSuccess: (state, action) => {
      state.uploadLoading = false;
      state.uploadSuccess = true;
      state.videos.push(action.payload);
      state.isUploadSuccess = true;
    },
    uploadVideoFailure: (state, action) => {
      state.uploadLoading = false;
      state.uploadError = action.payload;
      state.uploadSuccess = false;
    },
  },
});

export const {
  fetchVideosFailure,
  fetchVideosStart,
  fetchVideosSuccess,
  uploadVideoStart,
  uploadVideoSuccess,
  uploadVideoFailure,
} = videoSlice.actions;
const videoReducer = videoSlice.reducer;
export default videoReducer;

import {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
  uploadVideoFailure,
  uploadVideoStart,
  uploadVideoSuccess,
} from "./videoSlice";
import { fetchFromApi } from "../../services/api";

export const fetchVideos = () => async (dispatch) => {
    try{
        dispatch(fetchVideosStart());

        const data = await fetchFromApi("/videos/videos/");
        if (!data) {
            throw new Error("Invalid response from server");
        }
        dispatch(fetchVideosSuccess(data));
    } catch (error) {
        const message =
            error?.data?.detail ||
            error?.message ||
            "Failed to fetch videos. Please refresh the page and try again.";
        dispatch(fetchVideosFailure(message));
    }
};

export const uploadVideo = (formData) => async (dispatch) => {
    try {
        dispatch(uploadVideoStart());

        const data = await fetchFromApi("/videos/upload/", {
            method: "POST",
            body: formData,
            fileUpload: true,
        });

        if (!data) {
            throw new Error("Invalid response from server");
        }

        dispatch(uploadVideoSuccess(data));
    }
    catch (error) {
        const message =
            error?.data?.detail ||
            error?.message ||
            "Failed to upload video. Please try again.";
        dispatch(uploadVideoFailure(message));
    }   
};

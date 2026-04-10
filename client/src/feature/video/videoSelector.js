export const selectVideos = (state) => state.video.videos;
export const selectCurrentVideo = (state) => state.video.currentVideo;
export const selectVideoLoading = (state) => state.video.loading;
export const selectVideoError = (state) => state.video.error;
export const selectUploadLoading = (state) => state.video.uploadLoading;
export const selectUploadError = (state) => state.video.uploadError;
export const selectUploadSuccess = (state) => state.video.uploadSuccess;
export const selectIsUploadSuccess = (state) => state.video.isUploadSuccess;
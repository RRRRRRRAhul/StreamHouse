import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import categoryReducer from "../feature/category/categorySlice";
import videoReducer from "../feature/video/videoSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        video: videoReducer,
    }
})

export default store;
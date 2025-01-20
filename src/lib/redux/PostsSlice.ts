import { PostType } from '@/interfaces/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: { allPosts: PostType[], isLoading: boolean, details: PostType | null } = {
  allPosts: [],
  isLoading: false,
  details: null
};

export const getPostsFun = createAsyncThunk("getPosts/getPostsFun", () => {
  return axios
    .get(`https://linked-posts.routemisr.com/posts?limit=50&page=49`, {
      headers: {
        token: localStorage.getItem("userToken") // إرسال الـ token في الهيدر
      }
    })
    .then((res) => {
      // إرجاع البيانات فقط بدلاً من الكائن الكامل
      return res.data; // res.data يجب أن يحتوي على الـ posts
    })
    .catch((err) => {
      return err;
    });
});

export const getPostsDetails = createAsyncThunk("getPosts/getPostsDetails", (id: string) => {
  return axios
    .get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken") 
      }
    })
    .then((res) => {
      return res.data.post; 
    })
    .catch((err) => {
      return err;
    });
});

const PostsSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsFun.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPostsFun.fulfilled, (state, action) => {
      console.log(action?.payload?.posts); 
      state.allPosts = action?.payload?.posts; 
      state.isLoading = false;
    });

    builder.addCase(getPostsDetails.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPostsDetails.fulfilled, (state, action) => {
      console.log("post");
      console.log({ state, action });
      console.log(action?.payload); 
      state.details = action.payload; 
      state.isLoading = false;
    });
  }
});

export const postReducer = PostsSlice.reducer;

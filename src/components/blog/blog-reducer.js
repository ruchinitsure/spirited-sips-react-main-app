import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogThunk,
  deleteBlogThunk,
  getAllBlogsThunk,
  getBlogDetailsThunk,
  getBlogsByUserIdThunk,
} from "./blog-thunks";

const initialState = {
  blog: [],
  blogById: [],
  loading: false,
  blogCreateError: false,
  blogNotFoundError: false,
};

const BlogReducer = createSlice({
  name: "blog",
  initialState,
  extraReducers: {
    [createBlogThunk.pending]: (state) => {
      state.blogCreateError = false;
      state.blogNotFoundError = false;
      state.loading = true;
    },
    [createBlogThunk.fulfilled]: (state, { payload }) => {
      state.blogCreateError = false;
      state.blogNotFoundError = false;
      state.loading = false;
      state.blog.push(payload);
    },
    [createBlogThunk.rejected]: (state, { payload }) => {
      state.blogCreateError = true;
      state.blogNotFoundError = false;
    },
    [getAllBlogsThunk.pending]: (state) => {
      state.blogCreateError = false;
      state.blogNotFoundError = false;
      state.loading = true;
    },
    [getAllBlogsThunk.fulfilled]: (state, { payload }) => {
      state.blogCreateError = false;
      state.blogNotFoundError = false;
      state.loading = false;
      state.blog = payload;
    },

    [getBlogDetailsThunk.pending]: (state, { payload }) => {
      state.blogCreateError = false;
      state.blogNotFoundError = false;
      state.loading = true;
    },
    [getBlogDetailsThunk.fulfilled]: (state, { payload }) => {
      state.blogCreateError = false;
      state.blogNotFoundError = false;
      state.loading = false;
      state.blogById = payload;
    },
    [getBlogDetailsThunk.rejected]: (state, payload) => {
      state.blogCreateError = false;
      state.blogNotFoundError = true;
    },
    [deleteBlogThunk.fulfilled]: (state, action) => {
      state.blogs = state.blogs.filter((blog) => {
        return blog.id !== action.payload;
      });
    },
    [getBlogsByUserIdThunk.pending]: (state, action) => {
      state.blog = [];
      state.loading = true;
    },
    [getBlogsByUserIdThunk.fulfilled]: (state, action) => {
      state.blog = action.payload;
      state.loading = false;
    },
  },
});

export default BlogReducer.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../../services/blog-service";
import {
  deleteBlog,
  getBlogsByUserId,
  getBlogsByUserIdService,
} from "../../services/blog-service";
import { create } from "axios";

export const createBlogThunk = createAsyncThunk(
  "createBlog",
  async (newBlog) => await service.createBlog(newBlog)
);

export const getAllBlogsThunk = createAsyncThunk(
  "getAllBlogs",
  async () => await service.getAllBlogs()
);

export const getBlogDetailsThunk = createAsyncThunk(
  "getBlogDetails",
  async (bid) => await service.getBlogDetails(bid)
);

export const deleteBlogThunk = createAsyncThunk("deleteBlog", (mid) =>
  deleteBlog(mid)
);

export const getBlogsByUserIdThunk = createAsyncThunk(
  "getBlogsByUserIdThunk",
  (uid) => getBlogsByUserIdService(uid)
);

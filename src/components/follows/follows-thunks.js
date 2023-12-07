import { createAsyncThunk } from "@reduxjs/toolkit";
import { findFollowing, findFollowers, followUser } from "../../services/follows-service";

export const followUserThunk = createAsyncThunk(
  "followUser",
  async (follow) => await followUser(follow)
);

export const findFollowersThunk = createAsyncThunk(
  "findFollowers",
  async (followed) => await findFollowers(followed)
);

export const findFollowingThunk = createAsyncThunk(
  "findFollowing",
  async (follower) => await findFollowing(follower)
);

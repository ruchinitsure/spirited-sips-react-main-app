import axios from "axios";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const BLOG_API = BASE_API_URL + "/blog";

const api = axios.create({ withCredentials: true });

export const createBlog = async (blog) => {
  const response = await api.post(BLOG_API, blog);
  return response.data;
};

export const getAllBlogs = async () => {
  const response = await api.get(BLOG_API);
  return response.data;
};

export const getBlogDetails = async (bid) => {
  const response = await api.get(`${BLOG_API}/${bid}`);
  return response.data;
};

export const getBlogsByUserIdService = async (uid) => {
  const response = await api.get(`${BLOG_API}/user/${uid}`);
  return response.data;
};

export const deleteBlog = async (bid) => {
  const response = await axios.delete(`${BLOG_API}/${bid}`);
  const status = response.data;
  return bid;
};

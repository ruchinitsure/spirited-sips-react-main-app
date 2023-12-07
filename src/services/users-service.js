import axios from "axios";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const USER_API_URL = BASE_API_URL + "/users";

const api = axios.create({ withCredentials: true });

export const findUserById = async (uid) => {
  const response = await api.get(`${USER_API_URL}/${uid}`);
  const user = response.data;
  return user;
};

export const register = async (user) => {
  const response = await api.post(`${BASE_API_URL}/register`, user);
  const newUser = response.data;
  return newUser;
};

export const login = async (user) => {
  const response = await api.post(`${BASE_API_URL}/login`, user);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${BASE_API_URL}/logout`);
  return response.data;
};

export const profile = async () => {
  const response = await api.post(`${BASE_API_URL}/profile`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(USER_API_URL);
  return response.data;
};

export const updateProfile = async (updatedProfile) => {
  const response = await api.post(
    `${BASE_API_URL}/profile/update`,
    updatedProfile
  );
  return response.data;
};
export const createUser = () => {};



export const updateUser = async (user) => {
  const response = await axios.put(`${USER_API_URL}/${user._id}`, user);
  return user;
};


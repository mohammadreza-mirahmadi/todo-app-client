import axiosInstance from "./axiosInstance";
// =================================================================================

export const registerUser = (data) => {
  return axiosInstance.post("/users", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/users/login", data);
};

export const getProfile = () => {
  return axiosInstance.get("/users/profile");
};

export const updateProfile = (data) => {
  return axiosInstance.put("/users/me", data);
};

export const requestPasswordReset = (email) => {
  return axiosInstance.post("/users/forgot-password", { email });
};

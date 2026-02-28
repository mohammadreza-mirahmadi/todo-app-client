import axiosInstance from "./axiosInstance";
// =================================================================================

export const getDirectories = () => {
  return axiosInstance.get("/directories");
};

export const createDirectory = (data) => {
  return axiosInstance.post("/directories", data);
};

export const updateDirectory = (id, data) => {
  return axiosInstance.put(`/directories/${id}`, data);
};

export const deleteDirectory = (id) => {
  return axiosInstance.delete(`/directories/${id}`);
};

export const deleteAllDirectories = () => {
  return axiosInstance.delete(`/directories`);
};

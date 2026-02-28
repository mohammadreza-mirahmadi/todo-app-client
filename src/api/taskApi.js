import axiosInstance from "./axiosInstance";
// =================================================================================

export const fetchTasks = (params) => {
  return axiosInstance.get("/tasks", { params });
};

export const createTask = (data) => {
  return axiosInstance.post("/tasks", data);
};

export const updateTask = (id, data) => {
  return axiosInstance.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return axiosInstance.delete(`/tasks/${id}`);
};
export const deleteAllTasks = () => {
  return axiosInstance.delete(`/tasks`);
};

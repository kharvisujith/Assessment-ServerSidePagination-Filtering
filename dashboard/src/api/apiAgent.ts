import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosClient = axios.create({
  baseURL: `http://localhost:5000/api/`,
});

interface StudentDetailsParams {
  limit?: number;
  pageNumber?: number;
  name?: string;
  studentId?: number;
  totalMarks?: number;
}

export const fetchStudentDetails = (params?: StudentDetailsParams) => {
  return axiosClient.get("/students", { params });
};

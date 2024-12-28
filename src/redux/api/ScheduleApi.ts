import api from "@/services/api";

export const getScheduleApi = async (params?: {
  search?: string;
  filter?: string;
}): Promise<any> => {
  const response = await api.get<any>("/schedule", { params });
  return response.data;
};

export const createScheduleApi = async (data: any) => {
  const response = await api.post("/schedule", data);
  return response.data; // Return the API response for the doctor form submission
};
export const fetchScheduleByIdApi = async (id: string, doctorId: string, weekday: string): Promise<any> => {
  const response = await api.get<any>(`/schedule/${id}`, {
    params: { doctorId, weekday },
  });
  return response.data;
};
export const deleteScheduleApi = async (id: any) => {
  const response = await api.delete(`schedule/${id}`);
  return response.data; 
};
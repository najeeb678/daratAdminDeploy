import api from "@/services/api";

export const getAllAppointmentsApi = async (params?: {
  search?: string;
  filter?: string;
}): Promise<any> => {
  const response = await api.get<any>("/appointment/data/all", { params });
  return response.data;
};

export const getAppointmentsSlotsOfDoctorApi = async (
  data: any
): Promise<any> => {
  const response = await api.post<any>(
    "/appointment/appointmentsSlotsOfDoctor",
    data
  );
  return response.data;
};

export const bookAppointmentApi = async (data: any): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await api.post<any>("/appointment/book/admin", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAppointmentApi = async (id: any) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  const response = await api.delete(`/appointment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changeAppointmentStatusApi = async (data: {
  appointmentId: string;
  status: string;
}) => {
  const response = await api.post("appointment/change-status", data);
  return response.data;
};

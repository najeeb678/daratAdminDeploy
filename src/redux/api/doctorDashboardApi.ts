import api from "@/services/api";

export const getDoctorAnalyticsApi = async (data: { doctorId: string }) => {
  const response = await api.post("dashboard/analytics/doctor", data);
  return response.data;
};

export const getDoctorAppointmentsApi = async (payload: {
  doctorId: string;
  search: string;
  filter: string;
}) => {
  const { doctorId,search, filter } = payload;
  const response = await api.post(
    "dashboard/upcoming-appointments/doctor",
    { doctorId },
    {
      params: { search,filter },
    }
  );
  return response.data;
};


export const getDoctorsRecentPatientsApi = async (payload: {
  doctorId: string;
  timeFrame: string;
}) => {
  const { doctorId, timeFrame } = payload;

  const response = await api.post(
    "dashboard/recent-patients-for-a-doctor",
    { doctorId },
    {
      params: { timeFrame },
    }
  );
  return response.data;
};

export const getDoctorTopDepartmentsApi = async (data: {
  doctorId: string;
}) => {
  const response = await api.post("dashboard/top-departments/doctor", data);
  return response.data;
};

export const getDoctorNextAppointmentApi = async (data: {
  doctorId: string;
}) => {
  const response = await api.post("dashboard/next-appointment/doctor", data);
  return response.data;
};

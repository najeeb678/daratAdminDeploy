import api from "@/services/api";

export const getAnalyticsApi = async () => {
    const response = await api.get("dashboard/analytics");

    return response.data;
  };

  export const getUpcomingAppointmentsApi = async (filter: string = 'today') => {
    try {
      const response = await api.get(`dashboard/upcoming-appointments`, {
        params: { filter }, // Passing the filter as a query parameter
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching upcoming appointments:", error);
      throw error; // Propagate the error for further handling
    }
  };
  

  export const getTopDepartmentsApi = async () => {
    const response = await api.get("dashboard/top-departments");

    return response.data;
  };

  export const getRecentPatientsApi = async (timeFrame: string = 'weekly') => {
    const response = await api.get("dashboard/recent-patients", {
        params: { timeFrame },
    });

    return response.data;
  };

  export const changeAppointmentStatusApi = async (data: { appointmentId: string; status: string }) => {
    const response = await api.post("appointment/change-status", data);
    return response.data;
  };





  
  
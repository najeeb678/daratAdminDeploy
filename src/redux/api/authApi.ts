import api from "@/services/api";

export const loginApi = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("auth/login", data);

  const userInfo = {
    name: response?.data.name,
    profilePic: response?.data.profilePic,
  };
  localStorage.setItem("token", response?.data.access_token);
  localStorage.setItem("role", response?.data.role);
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  return response.data;
};
export const resendEmailOTPApi = async (data: { email: string }) => {
  const response = await api.post("auth/resendEmailOTP", data);
  return response.data;
};
export const createAdminApi = async (data: any) => {
  const response = await api.post("admin", data);
  return response.data;
};

export const UpdateAdminApi = ({ id, data }: { id: string; data: any }) => {
  return api.patch(`admin/${id}`, data); 
};
export const UpdateDoctorApi = ({ id, data }: { id: string; data: any }) => {
  return api.patch(`doctor/${id}`, data); 
};
export const verifyUserOTPApi = async (data: any) => {
  const response = await api.post("auth/verifyUser", data);
  return response.data;
};
export const resetForgottenPasswordApi = async (data: any) => {
  const response = await api.post("auth/resetForgottenPassword", data);
  return response.data;
};


export const getNotificationByRoleApi = async (role: string, doctorId?: string) => {

  if (role === "Doctor") {
    // Use POST method with payload for doctor
    const response = await api.post("notifications/doctor", { doctorId });
    return response.data;
  } else {
    // Use GET method for admin
    const response = await api.get(`notifications/${role}`);
    return response.data;
  }
};

export const getAdminDetailsApi = async (id: any) => {
  const response = await api.get(`admin/${id}`);
  return response.data;
};
export const getDoctorDetailsApi = async (id: any) => {
  const response = await api.get(`doctor/${id}`);
  return response.data;
};
export const markAsReadAdminNotificationsApi = async (data: any) => {
  const response = await api.post(
    `notifications/markOneNotificationAsReadForAdmin`,
    data
  );
  return response.data;
};
export const markAsReadDoctorNotificationsApi = async (data: any) => {
  const response = await api.post(
    `notifications/markOneNotificationAsReadForDoctor`,
    data
  );
  return response.data;
};

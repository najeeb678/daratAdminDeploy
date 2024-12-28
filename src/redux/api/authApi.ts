import api from "@/services/api";

export const loginApi = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("auth/login", data);
  console.log("login response", response);
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
export const verifyUserOTPApi = async (data: any) => {
  const response = await api.post("auth/verifyUser", data);
  return response.data;
};
export const resetForgottenPasswordApi = async (data: any) => {
  const response = await api.post("auth/resetForgottenPassword", data);
  return response.data;
};

export const getNotificationByRoleApi = async (data: any) => {
  const response = await api.get(`notifications/${data}`);
  return response.data;
};
export const markAsReadAdminNotificationsApi = async (data: any) => {
  const response = await api.post(`notifications/markOneNotificationAsReadForAdmin`,data);
  return response.data;
};
export const markAsReadDoctorNotificationsApi = async (data: any) => {
  const response = await api.post(`notifications/markOneNotificationAsReadForDoctor`,data);
  return response.data;
};
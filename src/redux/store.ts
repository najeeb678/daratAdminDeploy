import authSlice from "./slices/authSlice";
import adminDashboardSlice from "./slices/AdminDashboardSlice";
import { configureStore } from "@reduxjs/toolkit";
import doctorDashboardSlice from "./slices/doctorDashboardSlice";
import doctorsReducer from "./slices/DoctorsSlice";
import scheduleSlice from "./slices/ScheduleSlice";
import servicesSlice from "./slices/ServicesSlice";
import appointmentSlice from "./slices/AppointmentSlice";
import loyaltyPointsSlice from "./slices/loyaltyPointSlice";
import paharmacySlice from "./slices/PharmacySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: adminDashboardSlice,
    doctorDashboard: doctorDashboardSlice,
    doctors: doctorsReducer,
    schedule: scheduleSlice,
    service: servicesSlice,
    appointment: appointmentSlice,
    loyaltyPoints: loyaltyPointsSlice,
    pharmacy: paharmacySlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

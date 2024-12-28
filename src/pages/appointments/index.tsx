import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import AdminAppointmentsTable from "@/_components/core/Appointments";
import { getAllAppointments } from "@/redux/slices/AppointmentSlice";
import { getAllServices } from "@/redux/slices/ServicesSlice";
import { fetchDoctorUpcomingAppointments } from "@/redux/slices/doctorDashboardSlice";
import { getRole, getUserId } from "@/utils/utils";
import { useAppSelector } from "@/utils/hook";
import DoctorAppointmentsTable from "@/_components/core/Appointments/DoctorAppointmentsTable";

const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  let userId = getUserId();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getRole();
    setRole(userRole);
  }, []);

  const appointmentsData = useSelector(
    (state: RootState) => state.appointment.appointmentsData
  );
  const { doctorUpcomingAppointments, loading } = useAppSelector(
    (state: RootState) => state.doctorDashboard
  );

  const loadingappointmentsData = useSelector(
    (state: RootState) => state.appointment.loadingappointmentsData
  );

  const payload = {
    doctorId: userId || "",
    filter: "all",
    search: "",
  };

  useEffect(() => {
    if (role === "Admin") {
      dispatch(getAllAppointments({ search: "", filter: "" }));
      dispatch(getAllServices({ search: "", filter: "" }));
    } else {
      dispatch(fetchDoctorUpcomingAppointments(payload));
    }
  }, [dispatch, role]);

  return (
    <div>
      {role === "Admin" ? (
        <AdminAppointmentsTable
          appointmentsData={appointmentsData}
          loading={loadingappointmentsData}
        />
      ) : (
        <DoctorAppointmentsTable
          appointmentsData={doctorUpcomingAppointments}
          loading={loading}
        />
      )}
    </div>
  );
};

export default index;

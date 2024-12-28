import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import GenericTable from "@/_components/common/GenericTable";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Appointment, Column, FilterConfig } from "@/types/types";
import { Box } from "@mui/material";
import {
  changeAppointmentStatus,
  fetchUpcomingAppointments,
} from "@/redux/slices/AdminDashboardSlice";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { start } from "repl";

const AdminAppointmentsTable = () => {
  const dispatch = useAppDispatch();
  const { upcomingAppointments, loading } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const [apointmentfilter, setAppointmentFilter] = useState<string>("weekly");

  const transformedAppointmentsData = upcomingAppointments
    ? upcomingAppointments.map((appointment, index) => {
        return {
          Sr_No: index + 1,
          ID: appointment?.id,
          Patient: appointment?.patientId?.name,
          Doctor: appointment?.doctorId?.name,
          Time: `${new Date(appointment.startTime).toLocaleTimeString("en-US", {
            timeZone: "UTC",
          })}`,
          Date: new Date(appointment.startTime).toLocaleDateString(),
          Service: appointment?.subService?.name,
          Age: calculateAge(appointment?.patientId?.dateOfBirth),
          DateOfBirth: appointment?.patientId?.dateOfBirth,
          Mobile: appointment?.patientId?.contactNumber,
          Department: appointment?.subService?.name,
          Triage: "Urgent",
          Status: appointment?.status,
        };
      })
    : [];

  function calculateAge(dateOfBirth: string): string {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  }

  useEffect(() => {
    dispatch(fetchUpcomingAppointments(apointmentfilter));
  }, [dispatch, apointmentfilter]);

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await dispatch(
        changeAppointmentStatus({ appointmentId, status: newStatus })
      );

      if (response.meta.requestStatus === "fulfilled") {
        const updatedAppointments = upcomingAppointments
          ? upcomingAppointments.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, status: newStatus }
                : appointment
            )
          : [];

        dispatch({
          type: "dashboard/setUpcomingAppointments",
          payload: updatedAppointments,
        });
        dispatch(fetchUpcomingAppointments(apointmentfilter));
        toast.success("Appointment status updated successfully!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const statusDropdownoptions = [
    { value: "Pending", label: "Pending", color: "#FFA500" },
    { value: "Confirmed", label: "Confirmed", color: "#28A745" },
    { value: "Completed", label: "Completed", color: "#007BFF" },
    { value: "Cancelled", label: "Cancelled", color: "#DC3545" },
  ];

  const columns: Column<Appointment>[] = [
    {
      label: "SR. No",
      accessor: "Sr_No",
      render: (value: string, row: Appointment) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={"5px"}
          >
            <CustomCheckbox
              isDisabled={true}
              onChange={() => console.log("row1:", row.Patient)}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    // { label: "ID", accessor: "ID" },
    { label: "Patient", accessor: "Patient" },
    { label: "Doctor", accessor: "Doctor" },
    { label: "Time", accessor: "Time" },
    { label: "Date", accessor: "Date" },
    { label: "Service", accessor: "Service" },
    {
      label: "Status",
      accessor: "Status",
      render: (value: string, row: Appointment) => {
        return (
          <StatusDropdown
            options={statusDropdownoptions}
            selectedValue={row.Status || "Pending"}
            onChange={(val) => handleStatusChange(row.ID, val)}
            sx={{ width: "160px", backgroundColor: "#f5f5f5", height: "20px" }}
          />
        );
      },
    },
  ];

  const handleAppointmentSelectChange = (value: string) => {
    setAppointmentFilter(value);
  };

  const appointmentFilters: FilterConfig[] = [
    {
      label: "Weekly",
      options: [
        { label: "Weekly", value: " weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" },
        { label: "All", value: "all" },
      ],
      onChange: handleAppointmentSelectChange,
    },
  ];

  return (
    <>
      <GenericTable<Appointment>
        data={transformedAppointmentsData || []}
        columns={columns}
        title="Upcoming Appointments"
        loading={false}
        customContent={
          <Link
            href="/appointments"
            style={{
              color: "#7B7B7B",
              fontSize: "11px",
              lineHeight: "14px",
              fontWeight: "300",
              fontFamily: "AvenirMedium",
            }}
          >
            view all
          </Link>
        }
        filters={appointmentFilters}
        sx={{
          height: "292px",
          overflowY: "hidden",
          marginBottom: "0px",
        }}
        customTableStyles={{
          overflowY: "hidden",
        }}
      />
    </>
  );
};

export default AdminAppointmentsTable;

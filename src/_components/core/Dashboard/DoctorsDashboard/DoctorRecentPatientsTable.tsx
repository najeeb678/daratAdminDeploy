import React, { useEffect, useState } from "react";
import Link from "next/link";

import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";

import { Patient, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import CustomStatusStyles from "@/_components/common/CustomStatusStyles";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import { fetchDoctorsRecentPatients } from "@/redux/slices/doctorDashboardSlice";
import { formatDate, getUserId } from "@/utils/utils";

const DoctorRecentPatientsTable = () => {
  const [patientfilter, setPatientFilter] = useState<string>("weekly");
  let userId = getUserId();
  const dispatch = useAppDispatch();
  const { doctorsRecentPatients, loading } = useAppSelector(
    (state: RootState) => state.doctorDashboard
  );

  const payload = {
    doctorId: userId || "",
    timeFrame: patientfilter,
  };

  useEffect(() => {
    dispatch(fetchDoctorsRecentPatients(payload));
  }, [patientfilter, dispatch]);

  type TriageType = "Non Urgent" | "Urgent" | "Emergency" | "Out Patient";

  const transformedRecenetPatientData = Array.isArray(doctorsRecentPatients)
    ? doctorsRecentPatients?.map((patient, index) => {
        const triage: TriageType = "Urgent";

        return {
          Sr_No: index + 1,
          ID: patient?.id,
          PatientName: patient?.name,
          Age: calculateAge(patient?.dob),
          DateOfBirth:formatDate(patient?.dob),
          Mobile: patient?.email,
          Department: patient?.subService?.service?.name,
          Triage: triage,
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
  const triageStyleMapping = {
    "Non Urgent": {
      color: "#8adcd5",
      backgroundColor: "#effaf9",
    },
    Urgent: { color: "#f4b566", backgroundColor: "#fdf5e6" },
    Emergency: { color: "#ec2526", backgroundColor: "#fbe6f5" },
    "Out Patient": {
      color: "#939393",
      backgroundColor: "#efefef",
    },
  };

  const columns: Column<Patient>[] = [
    {
      label: "SR. No",
      accessor: "Sr_No",
      render: (value: string, row: Patient) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={"5px"}
          >
            <CustomCheckbox
              isDisabled
              onChange={() => {
                console.log("Selected Patient:", row.PatientName);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ID", accessor: "ID" },
    { label: "Patient Name", accessor: "PatientName" },
    { label: "Age", accessor: "Age" },
    { label: "Date of Birth", accessor: "DateOfBirth" },
    { label: "Mobile", accessor: "Mobile" },
    { label: "Department", accessor: "Department" },
    {
      label: "Triage",
      accessor: "Triage",
      render: (value: string, row: Patient) => (
        <CustomStatusStyles
          status={row.Triage}
          styleMapping={triageStyleMapping}
          additionalStyles={{ borderRadius: "30px", minWidth: "120px" }}
        />
      ),
    },
  ];

  const handleSelectChange = (value: string) => {
    setPatientFilter(value);
  };

  const filters: FilterConfig[] = [
    {
      label: "Weekly",
      options: [
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" },
        { label: "All", value: "all" },
      ],
      onChange: handleSelectChange,
    },
  ];

  return (
    <>
      <GenericTable<Patient>
        data={transformedRecenetPatientData}
        columns={columns}
        title="Recent Patients"
        loading={false}
        filters={filters}
        sx={{
          height: "292px",
          marginBottom: "0px",
        }}
      />
    </>
  );
};

export default DoctorRecentPatientsTable;

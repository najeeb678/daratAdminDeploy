import React, { useEffect, useState } from "react";
import Link from "next/link";

import GenericTable from "@/_components/common/GenericTable";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";
import CustomCheckbox from "@/_components/common/CustomCheckBox";

import { Patient, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import CustomStatusStyles from "@/_components/common/CustomStatusStyles";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import { fetchRecentPatients } from "@/redux/slices/AdminDashboardSlice";

const AdminRecentPatientsTable = () => {
  const [patientfilter, setPatientFilter] = useState<string>("weekly");

  const dispatch = useAppDispatch();
  const { recentPatients, loading } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const handlePatientSelectChange = (value: string) => {
    setPatientFilter(value);
  };

  useEffect(() => {
    dispatch(fetchRecentPatients(patientfilter));
  }, [patientfilter, dispatch]);

  type TriageType = "Non Urgent" | "Urgent" | "Emergency" | "Out Patient";

  const transformedRecenetPatientData = Array.isArray(recentPatients)
    ? recentPatients.map((patient, index) => {
        const triage: TriageType = "Urgent";

        return {
          Sr_No: index + 1,
          ID: patient?.patientId?.id,
          PatientName: patient?.patientId?.name,
          Age: patient.patientId?.age,
          DateOfBirth: patient?.patientId?.dateOfBirth,
          Mobile: patient?.patientId?.email,
          Department: patient?.subService?.service?.name,
          Triage: triage,
        };
      })
    : [];

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

  const filters: FilterConfig[] = [
    {
      label: "Weekly",
      options: [
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" },
        { label: "All", value: "all" },
      ],
      onChange: handlePatientSelectChange,
    },
  ];

  return (
    <>
      <GenericTable<Patient>
        data={transformedRecenetPatientData}
        columns={columns}
        title="Recent Patients"
        loading={false}
        // customContent={
        //   <Link
        //     href="#"
        //     onClick={(e) => {
        //       console.log("View All clicked");
        //       e.preventDefault();
        //     }}
        //     style={{
        //       color: "#7B7B7B",
        //       fontSize: "11px",
        //       lineHeight: "14px",
              
        //       fontWeight: "300",
        //       fontFamily: "AvenirMedium",
        //     }}
        //   >
        //     view all
        //   </Link>
        // }
        filters={filters}
        sx={{
          height: "292px",
          overflowY:"auto",
          marginBottom: "0px",
        }}
        customTableStyles={{
          overflowY: "hidden",
        }}
      />
    </>
  );
};

export default AdminRecentPatientsTable;

import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

import AddScheduleForm from "./AddScheduleForm";
import { Doctor, ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteDoctor,
  fetchDoctorById,
  getAllDoctors,
} from "@/redux/slices/DoctorsSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteSchedule,
  fetchScheduleById,
  getSchedule,
} from "@/redux/slices/ScheduleSlice";
import { formatDate, formatTime } from "@/utils/utils";

const ScheduleTable = ({ scheduleData, loading }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
  const [schedulefilter, setSchedulefilter] = useState<string>("weekly");
  const [searchInput, setSearchInput] = useState<string>("");
  // console.log("scheduleData", scheduleData);
  // console.log("selectedSchedule", selectedSchedule);
  useEffect(() => {
    dispatch(getSchedule({ search: searchInput, filter: schedulefilter }));
  }, [searchInput, schedulefilter, dispatch]);

  const transformedDoctorsData = scheduleData
    ? scheduleData.map((data: any, index: any) => ({
        Sr_No: index + 1,
        ID: data?.id,
        dr_name: data?.doctorId.name,
        service: data?.subService?.name,
        date: formatDate(data?.scheduleDate),
        start_time: formatTime(data?.startTime),
        end_time: formatTime(data?.endTime),
        number_of_slots: data?.slotNumber,
        doctorId: data?.doctorId.id,
        weekday: data?.weekday,
      }))
    : [];

  const columns: Column<any>[] = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: string, row: any) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={"5px"}
            sx={{ marginLeft: "-20px" }}
          >
            <CustomCheckbox
              isDisabled
              onChange={() => {
                console.log("Selected :", row.ID);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ID", accessor: "ID" },
    { label: "DR NAME", accessor: "dr_name" },
    { label: "SERVICE", accessor: "service" },
    { label: "DATE", accessor: "date" },
    { label: "START TIME", accessor: "start_time" },
    { label: "END TIME", accessor: "end_time" },
    {
      label: "NUMBER OF SLOTS",
      accessor: "number_of_slots",
      render: (value: string, row: Doctor) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <span>{value}</span>
            <DropDownForActions
              items={[
                // {
                //   icon: (
                //     <DriveFileRenameOutlineIcon
                //       fontSize="inherit"
                //       color="primary"
                //       sx={{ fontSize: "12px" }}
                //     />
                //   ),
                //   label: "Update",
                //   onClick: () => handleOpenUpdate(row),
                // },
                {
                  icon: (
                    <DeleteIcon
                      fontSize="inherit"
                      color="error"
                      sx={{ fontSize: "12px", padding: "0px" }}
                    />
                  ),
                  label: "Delete",
                  onClick: () => {
                    setSelectedSchedule(row);
                    setIsDeleteModalOpen(true);
                  },
                },
              ]}
            />
          </Box>
        );
      },
    },
  ];
  const onSearchSchedule = (searchTerm: string) => {
    dispatch(
      getSchedule({ search: searchTerm, filter: schedulefilter })
    ).unwrap();
  };

  const searchFunc = useCallback(_debounce(onSearchSchedule, 500), [
    schedulefilter,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchFunc(value);
  };

  const handleSelectChange = (value: string) => {
    setSchedulefilter(value);
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

  const handleOpenUpdate = async (row: any) => {

    // dispatch(schedule())
    const { ID, doctorId, weekday } = row; // Extract necessary data from the row

    const res = await dispatch(
      fetchScheduleById({ id: ID, doctorId, weekday })
    ).unwrap();

    setSelectedSchedule(res);
    setOpenScheduleModal(true);
  };
  const handleCloseUpdate = () => {
    setSelectedSchedule(null);
    setOpenScheduleModal(false);
  };
  const handleScheduleDelete = (Id: any) => {
    try {
      const res = dispatch(deleteSchedule(Id)).unwrap();
      setSelectedSchedule(null);
      toast.success("Schedule deleted successfully");
      setIsDeleteModalOpen(false);
      // dispatch(getAllDoctors({ search: "", filter: "" }));
    } catch (error) {
      toast.error("Failed to delete the Schedule");
    }
    setIsDeleteModalOpen(false);
  };

  const handleNewDoctor = () => {
    setOpenScheduleModal(true);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Create a new Schedule",
      variant: "contained",
      onClick: handleNewDoctor, // Open the Add Doctor modal
      size: "md",
      textColored: true,
      sx: {
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        width: "181px !important",
        boxShadow: "none",
        "&:hover": {
          color: "white !important",
        },
      },
    },
  ];

  return (
    <>
      <GenericTable<Doctor>
        data={transformedDoctorsData}
        columns={columns}
        title="Doctor’s Schedule"
        loading={loading}
        buttons={buttons}
        handleSearchChange={handleSearchChange}
        filters={filters}
        searchStyle={{
          width: "62%",
          height: "29px",
          top: "0px",
          borderRadius: "50px",
        }}
      />

      <CustomModal
        open={openScheduleModal}
        title={selectedSchedule ? "Update Schedule" : "Add Schedule"}
        handleClose={handleCloseUpdate}
        modalWidth="70%"
      >
        <AddScheduleForm
          selectedSchedule={selectedSchedule}
          handleClose={() => {
            setOpenScheduleModal(false);
            setSelectedSchedule(null);
          }}
        />
      </CustomModal>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Doctor"
        description="Are you sure you want to delete this Doctor?"
        cancel={() => {
          setSelectedSchedule(null), setIsDeleteModalOpen(false);
        }}
        proceed={() => handleScheduleDelete(selectedSchedule.ID)}
      />
    </>
  );
};

export default ScheduleTable;

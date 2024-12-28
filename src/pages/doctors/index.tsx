import React, { useEffect } from "react";
import DoctorsTable from "@/_components/core/DoctorsList/DoctorsTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllDoctors, getAllServices } from "@/redux/slices/DoctorsSlice";
import DoctorDetails from "@/_components/core/DoctorsList/DoctorDetails";
import Settings from "@/_components/core/Settings/Settings";

const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const doctorsData = useSelector((state: any) => state.doctors.doctorsData);
  const loading = useSelector((state: any) => state.doctors.loadingdoctorsData);

  const error = useSelector(
    (state: any) => state.doctors.errorgettingDoctorsData
  );

  useEffect(() => {
    dispatch(getAllDoctors({ search: "", filter: "" }));
    dispatch(getAllServices());
  }, [dispatch]);
  return (
    <>
      {/* <DoctorDetails /> */}
      <DoctorsTable doctorsData={doctorsData} loading={loading} />
      {/* <Settings /> */}
     

    </>
  );
};

export default index;

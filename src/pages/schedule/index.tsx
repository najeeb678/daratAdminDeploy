import ScheduleTable from "@/_components/core/Schedule/ScheduleTable";
import { getSchedule } from "@/redux/slices/ScheduleSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scheduleData = useSelector((state: any) => state.schedule.scheduleData);
  const loading = useSelector((state: any) => state.schedule.scheduleLoading);

  // console.log("scheduleData", scheduleData);

  useEffect(() => {
    dispatch(getSchedule({ search: "", filter: "" }));
  }, [dispatch]);
  return (
    <div>
      <ScheduleTable scheduleData={scheduleData} loading={loading} />
    </div>
  );
};

export default index;

import { fetchCustomerShipmentData } from "@/redux/slices/PharmacySlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomersTable from "@/_components/core/Pharmacy/Customers/CustomersTable";
import dynamic from "next/dynamic";
const Customers = () => {
  const DynamicCustomerTable = dynamic(
    () => import("@/_components/core/Pharmacy/Customers/CustomersTable"),
    {
      ssr: false, 
    }
  );
  const dispatch = useDispatch<AppDispatch>();

  const customersData = useSelector(
    (state: any) => state.pharmacy.allOrdersShipmentData
  );
  const loading = useSelector(
    (state: any) => state.pharmacy.loadingOrdersShipmentData
  );
  useEffect(() => {
    dispatch(fetchCustomerShipmentData({ search: "" }));
  }, [dispatch]);

  return (
    <div>
      <DynamicCustomerTable customersData={customersData} loading={loading} />
    </div>
  );
};

export default Customers;

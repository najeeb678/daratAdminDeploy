import { fetchCustomerShipmentData } from "@/redux/slices/PharmacySlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import CustomersTable from "../../_components/core/Pharmacy/Customers/CustomersTable";
const Customers = () => {
  const [isClient, setIsClient] = useState(false);

  
  const dispatch = useDispatch<AppDispatch>();

  const customersData = useSelector(
    (state: any) => state.pharmacy.allOrdersShipmentData
  );
  const loading = useSelector(
    (state: any) => state.pharmacy.loadingOrdersShipmentData
  );
  useEffect(() => {
    setIsClient(true);
    dispatch(fetchCustomerShipmentData({ search: "" }));
  }, [dispatch]);
  if (!isClient) return null; 
  return (
    <div>
      <CustomersTable customersData={customersData} loading={loading} />
    </div>
  );
};

export default Customers;

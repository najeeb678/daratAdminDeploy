"use client";
import { fetchCustomerShipmentData } from "@/redux/slices/PharmacySlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import dynamic from "next/dynamic";
const Shipment = () => {
  const DynamicOrderDetailsTable = dynamic(
    () => import("@/_components/core/Pharmacy/Shipment/OrderDetailsTable"),
    {
      ssr: false,
    }
  );
  const dispatch = useDispatch<AppDispatch>();

  const ordersData = useSelector(
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
      <DynamicOrderDetailsTable ordersData={ordersData} loading={loading} />
    </div>
  );
};

export default Shipment;

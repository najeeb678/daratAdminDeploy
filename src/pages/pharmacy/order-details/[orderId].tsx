import OrderDetails from "@/_components/core/Pharmacy/Shipment/OrderDetails/OrderDetails";
import { fetchCustomerShipmentData } from "@/redux/slices/PharmacySlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
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

  const orderDetails = ordersData?.find((order: any) => order.id === orderId);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          height: "100%",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#fbc02d" }} />
      </Box>
    );
  }

  if (!orderDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          height: "100%",
        }}
      >
        <CustomTypography sx={{ fontSize: "20px" }}>
          Order Not Found
        </CustomTypography>
      </Box>
    );
  }

  return (
    <div>
      <OrderDetails orderDetails={orderDetails} />
    </div>
  );
};

export default OrderDetailsPage;

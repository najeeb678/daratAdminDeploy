import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import GenericCard from "@/_components/common/GenericCard";
import Box from "@mui/material/Box";
import GiftModal from "./GiftModal";
import DiscountModal from "./DiscountModal";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { getDiscounts, getGiftsSlice } from "@/redux/slices/loyaltyPointSlice";
import { RootState } from "@/redux/store";

const DiscountCoupon = () => {
  const dispatch = useAppDispatch();
  const { getCouponCode, gifts, loading } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );
  // console.log("getCouponCode",getCouponCode)
  useEffect(() => {
    dispatch(getDiscounts());
    dispatch(getGiftsSlice());
  }, [dispatch]);

  const currentCoupon =
    getCouponCode && getCouponCode.length > 0 ? getCouponCode[0] : null;

  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, md: 6 }} component="div">
        <Box
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            border: "1px solid #D9D9D9",
            background: "#FFFFFF",
            padding: "20px",
            minHeight: "140px",
            overflow: "auto",
          }}
        >
          <CustomTypography
            sx={{
              marginTop: "15px",
              fontFamily: "var(--font-avenir-medium)",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "19.2px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Current Coupon Discount
          </CustomTypography>

          <CustomTypography
            sx={{
              marginTop: "12px",
              marginBottom: "5px",
              fontFamily: "var(--font-avenir-medium)",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "19.2px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            5%
          </CustomTypography>

          <CustomTypography
            sx={{
              fontFamily: "var(--font-avenir-medium)",
              fontSize: "24px",
              fontWeight: 800,
              lineHeight: "28.8px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "rgba(251, 192, 45, 1)",
            }}
          >
            {currentCoupon ? `SAR ${currentCoupon.value}` : "SAR 0.00"}
          </CustomTypography>
          <Box>
            <DiscountModal />
          </Box>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} component="div">
        <GenericCard height="140px">
          <Box
            display="flex"
            alignItems="start"
            flexDirection="column"
            gap="15px"
            justifyContent="space-between"
            marginTop="15px"
          >
            <CustomTypography
              sx={{
                // marginTop: "12px",
                // marginBottom: "10px",
                fontFamily: "var(--font-avenir-medium)",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "19.2px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              Gift
            </CustomTypography>

            <CustomTypography
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                fontSize: "22px",
                width: "70%",
                fontWeight: 800,
                lineHeight: "28.8px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "rgba(251, 192, 45, 1)",
              }}
            >
              {gifts?.length > 0 && gifts[0]?.subService?.name
                ? `Free ${gifts[0].subService.name} on Birthday`
                : "No Gift"}
            </CustomTypography>
          </Box>
          <Box>
            <GiftModal />
          </Box>
        </GenericCard>
      </Grid>
    </Grid>
  );
};

export default DiscountCoupon;

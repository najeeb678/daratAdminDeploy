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



  useEffect(() => {
    dispatch(getDiscounts());
    dispatch(getGiftsSlice());
  }, [dispatch]);

  const currentCoupon =
    getCouponCode && getCouponCode.length > 0 ? getCouponCode[0] : null;

  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 6 }} component="div">
        <GenericCard height="140px">
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
              marginTop: "18px",
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
        </GenericCard>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }} component="div">
        <GenericCard height="140px">
          <CustomTypography
            sx={{
              marginTop: "18px",
              marginBottom: "35px",
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
              fontSize: "24px",
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

          <Box>
            <GiftModal />
          </Box>
        </GenericCard>
      </Grid>
    </Grid>
  );
};

export default DiscountCoupon;

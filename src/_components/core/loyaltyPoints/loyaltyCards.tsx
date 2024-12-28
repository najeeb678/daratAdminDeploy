import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import EditModalExample from "./EditModal"; // Ensure this path is correct
import EditModal from "./EditModal";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";

const loyaltyLevels = [
  { level: "Silver", points: 500 },
  { level: "Gold", points: 1000 },
  { level: "Platinum", points: 2000 },
];

const LoyaltyCards = () => {
  const router = useRouter();

  const { loyaltyPackages, loading } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );

  if (loyaltyPackages && loyaltyPackages.length > 0) {
    // console.log(loyaltyPackages[0].expiryDate);
  } else {
    // console.log('No loyalty packages available');
  }
  
  return (
    <Grid container spacing={2}>
      {/* Loyalty Points Section */}
      <Grid size={{ xs: 12 }} component="div">
        <GenericCard height="140px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="15px"
          >
            <CustomTypography
          
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "19.2px",
                textAlign: "center",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              Current Loyalty Points
            </CustomTypography>
            <CustomTypography
              variant="h6"
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "14.4px",
                textAlign: "center",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "rgba(123, 123, 123, 1)",
              }}
            >
              Expiry date: {loyaltyPackages && loyaltyPackages[0] ? loyaltyPackages[0].expiryDate : 'No expiry date available'} days

            </CustomTypography>
          </Box>

          {/* Displaying loyalty levels with points */}
          <Box display="flex" justifyContent="left" marginTop="42px">
            {loyaltyLevels.map((level, index) => (
              <Box key={index} sx={{ marginRight: "35px" }}>
                <CustomTypography
                 
                  sx={{
                    // fontFamily: "Raleway, sans-serif",
                    fontFamily: "var(--font-avenir-medium)",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "28.8px",
                    textAlign: "center",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "rgba(251, 192, 45, 1)", // Color for the metal level
                  }}
                >
                  {level.level}:{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-avenir-medium)",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "19.2px",
                      textAlign: "center",
                      textDecoration: "none",
                      color: "rgba(22, 22, 22, 1)", // Color for the points
                    }}
                  >
                    {level.points} points
                  </span>
                </CustomTypography>
              </Box>
            ))}
          </Box>

          {/* Edit Button Triggering Modal */}

          <Box>
            <EditModal />
          </Box>
        </GenericCard>
      </Grid>
    </Grid>
  );
};

export default LoyaltyCards;

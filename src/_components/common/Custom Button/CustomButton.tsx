import React from "react";
import { Button, Typography, SxProps } from "@mui/material";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  sx?: SxProps; // For additional custom styling if needed
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, sx }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "157px",
        height: "41px",
        padding: "10px 20px 10px 20px",
        borderRadius: "50px",
        backgroundColor: "#FBC02D", // Replace with your desired color
        textTransform: "none", // To prevent automatic uppercase text
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        ...sx, // Allow for additional styles
      }}
    >
      <Typography
        sx={{
          fontFamily: 'AvenirMedium',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '21.86px',
          textAlign: 'center',
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
          color: 'white',
          whiteSpace: 'nowrap'
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default CustomButton;

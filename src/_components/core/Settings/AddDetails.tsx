import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Divider } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import Grid from "@mui/material/Grid2";

// Define the structure of the form data
interface FormData {
  personalDetails: {
    fullName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    address: string;
    iqamaId: string;
    dateOfBirth: string;
    bloodGroup: string;
  };
  professionalDetails: {
    designation: string;
    dateOfJoining: string;
    jobType: string;
    experience: string;
  };
  emergencyContactDetails: {
    name: string;
    relation: string;
    contactNumber: string;
    address: string;
  };
}

const AddDetails: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {
      fullName: "Enter Full Name",
      gender: "Female/Male",
      email: "Enter Email Address",
      phoneNumber: "Enter Phone Number",
      address: "Enter Address",
      iqamaId: "----- ------- -",
      dateOfBirth: "DD/MM/YYYY",
      bloodGroup: "-----",
    },
    professionalDetails: {
      designation: "Senior Administrator",
      dateOfJoining: "12/04/2023",
      jobType: "Full-Time",
      experience: "years",
    },
    emergencyContactDetails: {
      name: "Enter Emergency Contact Name",
      relation: "Brother",
      contactNumber: "+92 000 0000000",
      address: "F Block, Johar Town",
    },
  });

  // Handle input change with proper typing
  const handleChange = <T extends keyof FormData>(
    section: T,
    field: keyof FormData[T],
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Helper function to format field names (camelCase to readable)
  const formatFieldName = (field: string) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <Box
      sx={{
        padding: 3,
        border: "1px solid rgba(222, 222, 222, 0.63)",
        borderRadius: "10px",
        backgroundColor: "white",
        width: "1040px",
        marginTop: "15px",
        overflowX: "Hidden",
      }}
    >
      {/* Personal Details */}
      <CustomTypography
        sx={{
          fontFamily: "var(--font-raleway)",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "12px",
        }}
      >
        Personal Details
      </CustomTypography>
      <Divider
        sx={{
          //   borderWidth: "1px",
          borderColor: "rgba(166, 166, 166, 1)",
          marginBottom: "20px",
        }}
      />
      <Grid container spacing={3}>
        {Object.entries(formData.personalDetails).map(([field, value]) => (
            <Grid size={{ xs: 12, md: 3 }}key={field}>
          {/* <Grid item xs={12} sm={3} key={field}> */}
            <CustomTypography
              sx={{
                fontFamily: "var(--font-raleway)",
                fontSize: "11px",
                color: "rgba(178, 178, 178, 1)",
                marginBottom: "2px",
              }}
            >
              {formatFieldName(field)}
            </CustomTypography>
            <TextField
              fullWidth
              placeholder={`Enter ${formatFieldName(field)}`}
              value={value}
              onChange={(e) =>
                handleChange(
                  "personalDetails",
                  field as keyof FormData["personalDetails"],
                  e.target.value
                )
              }
              sx={{
                  width: "230px",
                height: "25px",
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                  height: "30px",
                  padding: "0",
                  marginLeft: "12px",
                  fontFamily:
                    field === "iqamaId" || field === "bloodGroup"
                    ? "AvenirMedium"
                    : "AvenirBook",
                    fontWeight: "500",
                },
            }}
            //   select={field === "gender"}
            >
              {/* {field === "gender" && (
                <>
                  <MenuItem
                    value="Female"
                    sx={{
                      fontFamily: "AvenirBook",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    Female
                  </MenuItem>
                  <MenuItem
                    value="Male"
                    sx={{
                      fontFamily: "AvenirBook",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    Male
                  </MenuItem>
                </>
              )} */}
            </TextField>
          </Grid>
        ))}
      </Grid>

      {/* Professional Details */}
      <CustomTypography
        sx={{
          fontFamily: "var(--font-raleway)",
          fontSize: "14px",
          fontWeight: "500",
          marginTop: "30px",
        }}
      >
        Professional Details
      </CustomTypography>
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {Object.entries(formData.professionalDetails).map(([field, value]) => (
        //   <Grid item xs={12} sm={3} key={field}>
        <Grid size={{ xs: 12, md: 3 }}key={field}>
            <CustomTypography
              sx={{
                fontFamily: "var(--font-raleway)",
                fontSize: "11px",
                color: "rgba(178, 178, 178, 1)",
                marginBottom: "2px",
              }}
            >
              {formatFieldName(field)}
            </CustomTypography>
            <TextField
              placeholder={`Enter ${formatFieldName(field)}`}
              value={value}
              onChange={(e) =>
                handleChange(
                  "professionalDetails",
                  field as keyof FormData["professionalDetails"],
                  e.target.value
                )
              }
              sx={{
                width: "230px",
                height: "25px",
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                  height: "30px",
                  padding: "0",
                  marginLeft: "12px",
                  fontFamily: "AvenirBook",
                  fontWeight: "500",
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Emergency Contact Details */}
      <CustomTypography
        sx={{
          fontFamily: "var(--font-raleway)",
          fontSize: "14px",
          fontWeight: "500",
          marginTop: "30px",
        }}
      >
        Emergency Contact Details
      </CustomTypography>
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {Object.entries(formData.emergencyContactDetails).map(
          ([field, value]) => (
            // <Grid item xs={12} sm={3} key={field}>
            <Grid size={{ xs: 12, md: 3 }}key={field}>
              <CustomTypography
                sx={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "11px",
                  color: "rgba(178, 178, 178, 1)",
                  marginBottom: "2px",
                }}
              >
                {formatFieldName(field)}
              </CustomTypography>
              <TextField
                placeholder={`Enter ${formatFieldName(field)}`}
                value={value}
                onChange={(e) =>
                  handleChange(
                    "emergencyContactDetails",
                    field as keyof FormData["emergencyContactDetails"],
                    e.target.value
                  )
                }
                sx={{
                  width: "230px",
                  height: "25px",
                  "& .MuiInputBase-input": {
                    fontSize: "12px",
                    height: "30px",
                    padding: "0",
                    marginLeft: "12px",
                    fontFamily: "AvenirBook",
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
          )
        )}
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          sx={{
            width: "114px",
            height: "30px",
            color: "rgba(166, 166, 166, 1)",
            // backgroundColor: "rgba(251, 192, 45, 1)",
            borderRadius: "50px",
            fontSize: "10px",
            fontFamily: "AvenirMedium",
            border: "1px solid rgba(166, 166, 166, 1)",
            marginRight: "10px",
          }}
        >
          Cancel
        </Button>

        <Button
          sx={{
            width: "114px",
            height: "30px",
            color: "white",
            backgroundColor: "rgba(251, 192, 45, 1)",
            borderRadius: "50px",
            fontSize: "10px",
            fontFamily: "AvenirMedium",
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default AddDetails;

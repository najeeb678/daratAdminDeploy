import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { toast } from "react-toastify";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import {
  createLoyaltyPackage,
  getSubservices,
} from "@/redux/slices/loyaltyPointSlice";
import { RootState } from "@/redux/store";

const EditModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    metalName: "",
    subServiceIds: [] as string[],
    expiryDate: "",
  });

  const dispatch = useAppDispatch();
  const { subServices, loading } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );

  useEffect(() => {
    dispatch(getSubservices());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value ,} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData({ ...formData, metalName: event.target.value });
  };

  const handleSubServiceChange = (event: SelectChangeEvent<string[]>) => {
    setFormData({
      ...formData,
      subServiceIds: event.target.value as string[],
    });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        createLoyaltyPackage({
          loyaltyType: formData.metalName,
          subServiceIds: formData.subServiceIds,
          expiryDate: formData.expiryDate
        })
      ).unwrap(); // Use `unwrap` to handle Redux Toolkit actions

      toast.success("Loyalty package updated successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to update loyalty package. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box marginTop="-28px" display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "108px",
          height: "29px",
          gap: "7.35px",
          borderRadius: "50px",
          backgroundColor: "rgba(251, 192, 45, 1)",
        }}
      >
        <CustomTypography
          sx={{
            fontFamily: "var(--font-avenir-medium)",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "16.39px",
            letterSpacing: "0.01em",
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          Edit
        </CustomTypography>
      </Button>

      <CustomModal
        open={open}
        title="Edit Information"
        handleClose={handleClose}
        modalWidth="50%"
      >
        <Box component="form" onSubmit={handleSubmit}>
       

          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel>Package Name</InputLabel>
            <Select
              label="Metal Name"
              name="metalName"
              value={formData.metalName}
              onChange={handleSelectChange}
            >
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Platinum">Platinum</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel>Sub-Services</InputLabel>
            <Select
              multiple
              value={formData.subServiceIds}
              onChange={handleSubServiceChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {subServices?.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Expiry Date"
            variant="outlined"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px", width: "100%" }}
          />

          <Box display="flex" justifyContent="flex-end" marginTop="16px">
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                width: "108px",
                height: "29px",
                gap: "7.35px",
                borderRadius: "50px",
                backgroundColor: "rgba(251, 192, 45, 1)",
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default EditModal;

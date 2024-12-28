import React, { useState } from "react";
import {
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useDispatch } from "react-redux";
import { createGiftSlice } from "@/redux/slices/loyaltyPointSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";

const GiftModal = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subServiceId: "",
  });

  const { subServices, loading } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, subServiceId: e.target.value });
  };

  const handleSaveChanges = () => {
    const payload = {
      subServiceId: formData.subServiceId,
    };

    dispatch(createGiftSlice(payload));

    handleClose();
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
          padding: "1.47px 14px",
          gap: "7.35px",
          borderRadius: "50px",
          borderWidth: "1px",
          backgroundColor: "rgba(251, 192, 45, 1)",
        }}
      >
        <CustomTypography
          sx={{
            fontFamily: "var(--font-avenir-medium)",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "16.39px",
            letterSpacing: "0.01em",
            textAlign: "left",
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          Add a Gift
        </CustomTypography>
      </Button>

      <CustomModal
        open={open}
        title="Gift Information"
        handleClose={handleClose}
        isFooter={false}
        modalWidth="50%"
      >
        <Box component="form">
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel>Sub Service</InputLabel>
            <Select
              label="Sub Service"
              name="subServiceId"
              value={formData.subServiceId}
              onChange={handleSelectChange}
            >
              {subServices
                ? subServices.map((subService) => (
                    <MenuItem key={subService.id} value={subService.id}>
                      {subService.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" marginTop="16px">
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "108px",
                height: "29px",
                gap: "7.35px",
                borderRadius: "50px",
                backgroundColor: "rgba(251, 192, 45, 1)",
              }}
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default GiftModal;

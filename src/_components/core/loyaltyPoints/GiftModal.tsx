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
import {
  createGiftSlice,
  getGiftsSlice,
} from "@/redux/slices/loyaltyPointSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";

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
  const handleSinleSelectChange = (value: any) => {
    console.log("vvv", value);
    setFormData({ ...formData, subServiceId: value?.id });
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
          <SingleSelect
            title="Sub Service"
            textFieldLabel="Select Sub-Service"
            name="subServiceId"
            data={subServices || []}
            onChange={(value) => {
              handleSinleSelectChange(value);
            }}
            value={
              subServices?.find(
                (service) => service.id === formData.subServiceId
              ) || null
            }
            onBlur={() => {}}
            sx={{ height: "48px", borderRadius: "5px", marginBottom: "16px" }}
          />
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

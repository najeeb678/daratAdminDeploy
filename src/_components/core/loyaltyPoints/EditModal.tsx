import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import {
  createLoyaltyPackage,
  getSubservices,
} from "@/redux/slices/loyaltyPointSlice";
import { RootState } from "@/redux/store";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import GenericInput from "@/_components/common/InputField/GenericInput";

const packageOptions = [
  { id: "Silver", name: "Silver" },
  { id: "Gold", name: "Gold" },
  { id: "Platinum", name: "Platinum" },
];

const EditModal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { subServices } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );

  useEffect(() => {
    dispatch(getSubservices());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      metalName: "",
      subServiceIds: [],
      expiryDate: "",
    },
    validationSchema: Yup.object().shape({
      metalName: Yup.string().required("Package name is required"),
      subServiceIds: Yup.array().min(1, "At least one sub-service is required"),
      expiryDate: Yup.number()
        .required("Expiry days are required")
        .positive("Must be a positive number"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(
          createLoyaltyPackage({
            loyaltyType: values.metalName,
            subServiceIds: values.subServiceIds, // This should be an array
            expiryDate: values.expiryDate,
          })
        ).unwrap();

        toast.success("Loyalty package updated successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to update loyalty package. Please try again.");
        console.error("Error submitting form:", error);
      }
    },
  });

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
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <SingleSelect
            title="Select Package"
            textFieldLabel="Package Name"
            name="metalName"
            data={packageOptions}
            onChange={(value) => formik.setFieldValue("metalName", value?.name)}
            value={
              packageOptions.find(
                (option) => option.name === formik.values.metalName
              ) || null
            }
            onBlur={formik.handleBlur("metalName")}
          />
          {formik.touched.metalName && formik.errors.metalName && (
            <span className="error-message">{formik.errors.metalName}</span>
          )}

          <SingleSelect
            title="Sub Service"
            textFieldLabel="Select Sub-Service"
            name="subServiceIds"
            data={subServices || []}
            onChange={(value) => {
              const selectedIds = value ? [value.id] : [];
              formik.setFieldValue("subServiceIds", selectedIds);
            }}
            value={
              subServices?.find(
                (service) => service.id === formik.values.subServiceIds[0]
              ) || null
            }
            onBlur={formik.handleBlur("subServiceIds")}
          />
          {formik.touched.subServiceIds && formik.errors.subServiceIds && (
            <span className="error-message">{formik.errors.subServiceIds}</span>
          )}

          <GenericInput
            label="Expiry Days"
            type="text"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange("expiryDate")}
            onBlur={formik.handleBlur("expiryDate")}
            placeholder="Add No.of expiry days"
            error={
              formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
            }
            helperText={
              formik.touched.expiryDate && formik.errors.expiryDate
                ? formik.errors.expiryDate
                : undefined
            }
          />

          <Box display="flex" justifyContent="flex-end" marginTop="16px">
            <Button
              type="submit"
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

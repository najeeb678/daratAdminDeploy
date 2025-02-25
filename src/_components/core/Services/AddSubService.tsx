import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";

import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import CustomMultilineInput from "@/_components/common/InputField/CustomInputField";
import { createCetegory } from "@/redux/slices/PharmacySlice";
import {
  createServices,
  createSubServices,
  updateSubServices,
} from "@/redux/slices/ServicesSlice";
import { useRouter } from "next/router";

interface AddServiceProps {
  handleClose?: () => void;
  subServiceData?: any | null;
}
const AddSubService: React.FC<AddServiceProps> = ({
  handleClose = () => {},
  subServiceData = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const router = useRouter();
  const { sub_serviceId } = router.query;
  const [subServiceImage, setSubServiceImage] = useState("");
  console.log("sub_serviceId in modal", sub_serviceId);
  const handleImageChange = (url: string) => {
    formik.setFieldValue("picture", url);
    setSubServiceImage(url); // Save the uploaded image URL
  };
  console.log("outsubServiceData", subServiceData);
  useEffect(() => {
    if (subServiceData) {
      console.log("subServiceData", subServiceData);
      setIsUpdate(true);
      formik.setValues({
        name: subServiceData?.SERVICE || "",
        picture: subServiceData?.IMAGE || "",
        description: subServiceData?.DESCRIPTION || "",
      });
      setSubServiceImage(subServiceData.IMAGE);
    } else {
      setIsUpdate(false);
      formik.resetForm();
    }
  }, [subServiceData]);

  const formik = useFormik({
    initialValues: {
      name: "",
      picture: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Sub Service Name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (data) => {
      console.log("in submit");
      setLoading(true);
      console.log("Form submitted with data:", data);

      try {
        if (data.picture === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return; // Prevent submission if image is not uploaded
        }

        const payload = {
          ...data,
          serviceId: sub_serviceId, // Add sub_serviceId to the payload
        };

        if (isUpdate) {
          const updateData = {
            ...data,
            id: subServiceData?.ID,
          };
          console.log("updateData", subServiceData);
          await dispatch(updateSubServices(updateData)).unwrap();
          toast("Updated successfully", { type: "success" });
        } else {
          await dispatch(createSubServices(payload)).unwrap();
          toast("Service created successfully", { type: "success" });
        }

        setLoading(false);
        handleClose();
      } catch (error: any) {
        toast.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: { xs: "10px", sm: "15px", md: "20px" },
      }}
    >
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid component="div" size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2}>
              <Grid component="div" size={{ xs: 12 }}>
                <GenericInput
                  label="Enter Sub Service Name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Enter Sub Service Name"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : undefined
                  }
                />
              </Grid>
              <Grid component="div" size={{ xs: 12 }}>
                <CustomMultilineInput
                  name="description"
                  noOflines={4}
                  title="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  placeholder="Enter Description"
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : undefined
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid component="div" size={{ xs: 12, md: 4 }}>
            <ProductImageUploader
              selectedImage={subServiceImage}
              onImageChange={handleImageChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
            gap: 1,
            justifyContent: { xs: "center", sm: "center", md: "flex-end" },
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              fontSize: "13px",
              fontWeight: 400,
              borderRadius: "50px",
              borderColor: "#b2b2b2",
              color: "#A6A6A6",
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
              marginBottom: {
                xs: "10px",
                sm: "10px",
                md: "0px",
              },
              "&:hover": {
                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                transform: "scale(1.005)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              borderRadius: "50px",
              backgroundColor: "#FBC02D",
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#FBC02D",
                color: "white",
                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                transform: "scale(1.005)",
              },
            }}
          >
            {loading ? (
              <ThreeDots
                height="28"
                width="40"
                radius="9"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
                visible
              />
            ) : isUpdate ? (
              "Update Sub Service"
            ) : (
              "Add Sub Service"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddSubService;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import

import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";
import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import CustomMultilineInput from "@/_components/common/InputField/CustomInputField";
import { createServices, updateServices } from "@/redux/slices/ServicesSlice";
import { useAppSelector } from "@/utils/hook";

interface AddServiceProps {
  handleClose?: () => void;
  serviceData?: any | null; // Renamed from productData to serviceData
}

const AddService: React.FC<AddServiceProps> = ({
  handleClose = () => {},
  serviceData = null, // Renamed from productData to serviceData
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allServicesData } = useAppSelector(
    (state: RootState) => state.service
  );
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [serviceImage, setServiceImage] = useState(""); // Renamed from productImage to serviceImage
  const [serviceId] = useState(serviceData?.id);

  const handleImageChange = (url: string) => {
    formik.setFieldValue("picture", url);
    setServiceImage(url); // Save the uploaded image URL
  };

  console.log("serviceData", serviceData);

  useEffect(() => {
    if (serviceData) {
      setIsUpdate(true);
      formik.setValues({
        name: serviceData?.SERVICE || "",
        picture: serviceData?.IMAGE || "",
        description: serviceData?.DESCRIPTION || "",
      });
      setServiceImage(serviceData.IMAGE);
    } else {
      setIsUpdate(false);
      formik.resetForm();
    }
  }, [serviceData]);

  const formik = useFormik({
    initialValues: {
      name: "",
      picture: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Service Name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      console.log("Form submitted with data:", data);

      try {
        if (data.picture === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return;
        }

        if (isUpdate) {
          const updateData = {
            ...data,
            id: serviceData?.ID,
          };
          await dispatch(updateServices(updateData)).unwrap();
          toast("Updated successfully", { type: "success" });
        } else {
          await dispatch(createServices(data)).unwrap();
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
          <Grid size={{ xs: 12, md: 8 }} component="div">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }} component="div">
                <GenericInput
                  label="Enter Service Name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Enter Service Name"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name ? formik.errors.name : ""}
                />
              </Grid>
              <Grid size={{ xs: 12 }} component="div">
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
                    formik.touched.description ? formik.errors.description : ""
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            display="flex"
            justifyContent="center"
            component="div"
          >
            <ProductImageUploader
              selectedImage={serviceImage}
              onImageChange={handleImageChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: { md: "flex-end" },
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
              marginRight: "10px",
              color: "#A6A6A6",
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
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
              fontFamily: "Avenir",
              lineHeight: "18px",
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
              "Update Service"
            ) : (
              "Add Service"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddService;

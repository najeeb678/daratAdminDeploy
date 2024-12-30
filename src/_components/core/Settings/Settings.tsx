import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";

import ProfileImageSelector from "@/_components/common/ImageSelector/ProfileImageSelector";
import { toast } from "react-toastify";
import { createAdmin } from "@/redux/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const styles = {
  cardContainer: {
    overflowX: "Hidden",
    width: "1040px",
    height: "166px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "rgba(222, 222, 222, 0.63)",
    backgroundColor: "white",
  },
  profileImage: {
    width: "119px",
    height: "119px",
    borderRadius: "50%",
    marginRight: "30px",
    marginTop: "30px",
    marginLeft: "40px",
  },
  textContainer: {
    flex: 0.93,
  },
  name: {
    margin: "0",
    fontSize: "17px",
    fontWeight: "500",
    fontFamily: "var(--font-raleway)",
  },
  details: {
    fontFamily: "AvenirBook",
    fontWeight: "400",
    fontSize: "11px",
    margin: "5px 0",
    color: "rgb(123, 123, 123, 0.7)",
  },
};

interface AddCategoryProps {
  handleClose?: () => void;
  productData?: any | null;
}
const SettingsDetails: React.FC<AddCategoryProps> = ({
  handleClose = () => {},
  productData = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [productImage, setProductImage] = useState("");

  const handleImageChange = (url: string) => {
    formik.setFieldValue("profilePic", url);
    setProductImage(url);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profilePic: "",
      contactNo: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),

      contactNo: Yup.string().required("Contact No is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      console.log("Form submitted with data:", data);
      try {
        if (data.profilePic === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return;
        }

        if (isUpdate) {
          toast("Updated successfully", { type: "success" });
        } else {
          const res = await dispatch(createAdmin(data)).unwrap();
          toast("Category created successfully", { type: "success" });
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
      style={{
        width: "100%",

        borderRadius: "10px",
        padding: "5px 20px",
      }}
    >
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} direction="row">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            direction="row"
            size={12}
          >
            <Grid size={{ xs: 12 }} component="div">
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #CECECE",
                  borderRadius: "10px",
                  padding: "0px 20px",
                  height: "160px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ProfileImageSelector
                      selectedImage={imageUrl}
                      onImageChange={handleImageChange}
                      setIsImageUploading={setIsImageUploading}
                      imageHeight={110}
                      imageWidth={110}
                      customStyles={{
                        justifyContent: "flex-start",
                        marginLeft: "20px",
                        width: "auto",
                      }}
                    />
                    <Box
                      sx={{
                        marginLeft: "15px",
                        height: "100%",
                        alignItems: "flex-end",
                      }}
                    >
                      <CustomTypography
                        sx={{
                          fontWeight: "500",
                          fontSize: "18px",
                          lineheight: "20px",
                          color: "#161616",
                        }}
                      >
                        Full Name
                      </CustomTypography>
                      <CustomTypography
                        sx={{
                          fontWeight: "350",
                          fontSize: "12px",
                          lineheight: "17px",
                          color: "#7B7B7B",
                        }}
                      >
                        Administrator
                      </CustomTypography>
                      <CustomTypography
                        sx={{
                          fontWeight: "350",
                          fontSize: "12px",
                          lineheight: "17px",
                          color: "#7B7B7B",
                        }}
                      >
                        Riyadh, Saudia
                      </CustomTypography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{}}>
                  <Button
                    onClick={() => {}}
                    style={{
                      height: "25px",
                      width: "85px",
                      backgroundColor: "rgba(251, 192, 45, 1)",
                      border: "none",
                      color: "white",
                      borderRadius: "12px",
                      padding: "6px 12px",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }} component="div">
              <GenericInput
                label="Enter Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                placeholder="Enter  Name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                name="email"
                label="Email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                placeholder="Enter Email"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="error-message">
                  {" "}
                  {typeof formik.errors.email === "string"
                    ? formik.errors.email
                    : ""}
                </span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Contact No "
                type="number"
                name="contactNo"
                value={formik.values.contactNo}
                onChange={formik.handleChange("contactNo")}
                onBlur={formik.handleBlur("contactNo")}
                placeholder="Add contactNo"
                error={
                  formik.touched.contactNo && Boolean(formik.errors.contactNo)
                }
                helperText={
                  formik.touched.contactNo && formik.errors.contactNo
                    ? formik.errors.contactNo
                    : undefined
                }
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              marginTop: "20px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "12px !important",
                fontWeight: "700 !important",
                fontFamily: "Avenir !important",
                lineHeight: "18px !important",
                borderRadius: "50px !important",
                backgroundColor: "#FBC02D !important",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#FBC02D !important", // Same background color
                  color: "white !important",
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
                "Update "
              ) : (
                <>Update</>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingsDetails;

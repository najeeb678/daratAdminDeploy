import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";
import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import CustomMultilineInput from "@/_components/common/InputField/CustomInputField";
import {
  createProduct,
  getAllCategories,
  getAllPharmacyProducts,
  upDateProduct,
} from "@/redux/slices/PharmacySlice";

interface AddProductProps {
  handleClose?: () => void;
  productData?: any | null;
}

const AddProductForm: React.FC<AddProductProps> = ({
  handleClose = () => {},
  productData = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [productImage, setProductImage] = useState("");

  const allCategoriesData = useSelector(
    (state: any) => state.pharmacy.allCategories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  useEffect(() => {
    if (productData) {
      formik.setValues({
        name: productData.name,
        attachment: productData.attachment,
        description: productData.description,
        categoryId: productData.categoryId,
      });
      setProductImage(productData.attachment);
      setIsUpdate(true);
    }
  }, [productData]);

  const handleImageChange = (url: string) => {
    formik.setFieldValue("attachment", url);
    setProductImage(url);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      attachment: "",
      description: "",
      categoryId: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Full Name is required"),
      categoryId: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      const payload = {
        ...data,
        variants: [
          {
            size: "S",
            price: 29.99,
            stock: 100,
          },
          {
            size: "M",
            price: 24.99,
            stock: 150,
          },
        ],
      };
      try {
        if (payload.attachment === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return;
        }
        if (isUpdate) {
          const response = await dispatch(
            upDateProduct({ id: productData.id, data: payload })
          ).unwrap();
          if (response) {
            toast("Product updated successfully", { type: "success" });
            dispatch(getAllPharmacyProducts({ search: "", filter: "" }));
          }
        } else {
          const res = await dispatch(createProduct(payload)).unwrap();
          if (res) {
            toast("Product created successfully", { type: "success" });
            dispatch(getAllPharmacyProducts({ search: "", filter: "" }));
          }
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
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "5px 20px",
      }}
    >
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={2}
              direction="row"
              size={8}
            >
              <Grid size={{ xs: 12 }} component="div">
                <SingleSelect
                  title="Select a Category"
                  textFieldLabel="Select Category"
                  data={allCategoriesData || []}
                  onChange={(value) =>
                    formik.setFieldValue("categoryId", value?.id || "")
                  }
                  onBlur={formik.handleBlur("categoryId")}
                  name="categoryId"
                  value={
                    allCategoriesData.find(
                      (cat: any) => cat.id === formik.values.categoryId
                    ) || null
                  }
                />
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <Typography color="error" variant="caption">
                    {formik.errors.categoryId}
                  </Typography>
                )}
              </Grid>
              <Grid size={{ xs: 12 }} component="div">
                <GenericInput
                  name="name"
                  label="Enter Product Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Enter Product Name"
                />
                {formik.touched.name && formik.errors.name && (
                  <span className="error-message">
                    {" "}
                    {typeof formik.errors.name === "string"
                      ? formik.errors.name
                      : ""}
                  </span>
                )}
              </Grid>
            </Grid>

            <Grid size={{ xs: 4 }} component="div">
              <ProductImageUploader
                selectedImage={productImage}
                onImageChange={handleImageChange}
                height={160}
                width={160}
              />
            </Grid>

            <Grid size={{ xs: 12 }} component="div">
              <CustomMultilineInput
                name="description"
                noOflines={5}
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

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              style={{ marginLeft: "10px" }}
              sx={{
                fontSize: "13px !important",
                fontWeight: "400 !important",
                borderRadius: "50px !important",
                borderColor: "#b2b2b2",
                marginRight: "20px",
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
                "Update Product"
              ) : (
                <>
                  {/* <AddIcon sx={{ marginRight: 1 }} /> */}
                  Add Product
                </>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddProductForm;


// import React, { useState } from "react";
// import { Box, Button, Avatar, IconButton, Typography } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { useDispatch } from "react-redux"; 

// import { ThreeDots } from "react-loader-spinner";
// import { uploadImage } from "@/redux/slices/DoctorsSlice";

// interface ProductImageUploaderProps {
//   selectedImage: string;
//   onImageChange: (imageUrl: string) => void;
//   setIsImageUploading?: (isUploading: boolean) => void;
// }

// const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
//   selectedImage,
//   onImageChange,
//   setIsImageUploading,
// }) => {
//   const [uploading, setUploading] = useState(false);
//   const dispatch: any = useDispatch();

//   const handleImageChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setUploading(true);
//       if (setIsImageUploading) {
//         setIsImageUploading(true);
//       }
//       try {
//         const formData = new FormData();
//         formData.append("image", file);
//         const imageUrl = await dispatch(uploadImage(formData)).unwrap(); // Replace with your product image upload action

//         onImageChange(imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         if (setIsImageUploading) {
//           setIsImageUploading(false);
//         }
//         setUploading(false);
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       <Box sx={{ position: "relative" }}>
//         {/* Product Image */}
//         <Button
//           sx={{
//             height: 160,
//             width: 160,
//             textAlign: "center",
//             borderRadius: "8px",
//             position: "relative",
//             overflow: "hidden", // Ensure overlay stays within the bounds
//           }}
//           component="label"
//           disabled={uploading}
//         >
//           <Avatar
//             alt="Product image"
//             src={selectedImage}
//             variant="rounded"
//             sx={{
//               width: 160,
//               height: 160,
//               opacity: uploading ? 0.5 : 1,
//             }}
//           />
//           {uploading && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 backgroundColor: "rgba(0, 0, 0, 0.05)",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: "column",
//                   gap: "5px",
//                 }}
//               >
//                 <Typography variant="caption">Uploading</Typography>
//                 <ThreeDots
//                   height="28"
//                   width="40"
//                   radius="9"
//                   color="black"
//                   ariaLabel="three-dots-loading"
//                   visible
//                 />
//               </Box>
//             </Box>
//           )}
//           <input
//             type="file"
//             accept="image/png, image/jpg, image/jpeg"
//             hidden
//             onChange={handleImageChange}
//           />
//         </Button>

//         {/* Edit Button */}
//         <IconButton
//           component="label"
//           sx={{
//             position: "absolute",
//             bottom: 10,
//             right: 10,
//             backgroundColor: "#fff",
//             borderRadius: "50%",
//             padding: 0.5,
//             boxShadow: 1,
//             "&:hover": {
//               backgroundColor: "#f0f0f0",
//             },
//           }}
//           disabled={uploading}
//         >
//           <EditIcon fontSize="small" />
//           <input
//             type="file"
//             accept="image/png, image/jpg, image/jpeg"
//             hidden
//             onChange={handleImageChange}
//           />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default ProductImageUploader;


import React, { useState } from "react";
import { Box, Button, Avatar, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { ThreeDots } from "react-loader-spinner";
import { uploadImage } from "@/redux/slices/DoctorsSlice";

interface ProductImageUploaderProps {
  selectedImage: string;
  height?: number;
  width?: number;
  onImageChange: (imageUrl: string) => void;
  setIsImageUploading?: (isUploading: boolean) => void;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  selectedImage,
  height,
  width,
  onImageChange,
  setIsImageUploading,
}) => {
  const [uploading, setUploading] = useState(false);
  const dispatch: any = useDispatch();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      if (setIsImageUploading) {
        setIsImageUploading(true);
      }
      try {
        const formData = new FormData();
        formData.append("image", file);
        const imageUrl = await dispatch(uploadImage(formData)).unwrap();

        onImageChange(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        if (setIsImageUploading) {
          setIsImageUploading(false);
        }
        setUploading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Product Image */}
        <Button
          sx={{
            height: height || 180, 
            width: width || 160, 
            textAlign: "center",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
            border: "2px dashed #ddd",
            backgroundColor: "#f9f9f9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="label"
          disabled={uploading}
        >
          {selectedImage ? (
            <Avatar
              alt="Product image"
              src={selectedImage}
              variant="rounded"
              sx={{
                height: height || 180, 
                width: width || 160, 
                opacity: uploading ? 0.5 : 1,
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#aaa",
              }}
            >
              <PhotoCamera fontSize="large" />
              <Typography variant="caption">Upload Image</Typography>
            </Box>
          )}

          {uploading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Typography variant="caption">Uploading</Typography>
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  visible
                />
              </Box>
            </Box>
          )}
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {/* Edit Button */}
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: 0.5,
            boxShadow: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          disabled={uploading}
        >
          <EditIcon fontSize="small" />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            hidden
            onChange={handleImageChange}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductImageUploader;

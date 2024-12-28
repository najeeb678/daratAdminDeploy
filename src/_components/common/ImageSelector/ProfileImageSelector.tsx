import React, { useState } from "react";
import { Box, Button, Avatar, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux"; // Redux dispatch
import { uploadImage } from "@/redux/slices/DoctorsSlice";
import { ThreeDots } from "react-loader-spinner";

interface ProfileImageSelectorProps {
  selectedImage: string;
  onImageChange: (imageUrl: string) => void;
  setIsImageUploading?: (isUploading: boolean) => void;
}

const ProfileImageSelector: React.FC<ProfileImageSelectorProps> = ({
  selectedImage,
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
        setIsImageUploading(true); // Only call if it's defined
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
          setIsImageUploading(false); // Only call if it's defined
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
        {/* Profile Image */}
        <Button
          sx={{
            height: 160,
            width: 160,
            textAlign: "center",
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden", // Ensure overlay stays within the circle
          }}
          component="label"
          disabled={uploading} // Disable button while uploading
        >
          <Avatar
            alt="Profile image"
            src={selectedImage}
            sx={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              opacity: uploading ? 0.5 : 1, // Dim avatar when uploading
            }}
          />
          {/* Overlay for Uploading */}
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
                borderRadius: "50%",
                color: "#fff",
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
                <Typography
                  variant="caption"
                  sx={{
                    marginLeft: 1,
                  }}
                >
                  Uploading
                </Typography>
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
          disabled={uploading} // Disable while uploading
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

export default ProfileImageSelector;

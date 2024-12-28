import React from "react";
import Box from "@mui/material/Box";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Icon from "@mui/material/Icon";
const profiles = [
  {
    name: "Full Name",
    role: "Administrator",
    location: "Riyadh, Saudia ",
    image: "/images/Ellipse 3.svg", // Replace with the correct image path
  },

];

const ProfileCard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {profiles.map((profile, index) => (
        <Box key={index} sx={styles.cardContainer}>
          <img
            src={profile.image}
            alt={profile.name}
            style={styles.profileImage}
          />
            <PhotoCameraIcon style={{position: "absolute", top: "115px", left: "120px", color: "rgba(251, 192, 45, 1)", backgroundColor: "white", borderRadius: "50%",height:"20px"}}/>
          <Box sx={styles.textContainer}>
            <h2 style={styles.name}>{profile.name}</h2>
            <p style={styles.details}>{profile.role}</p>
            <p style={styles.details}>{profile.location}</p>
          </Box>
          <button
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
          </button>
        </Box>
      ))}
    </Box>
  );
};

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

export default ProfileCard;

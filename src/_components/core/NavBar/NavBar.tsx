import { Box } from "@mui/material";
import Notifications from "./Notifications";
import ProfileMenu from "./ProfileMenu";

const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: "0px 25px 0px 10px",
      }}
    >
      <Box>
        <img
          src="/images/weblogo%201.svg"
          alt="web logo"
          style={{
            width: "151px",
            height: "46px",
            marginTop: "6px",
            marginLeft: "25px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          gap: "15px",
        }}
      >
        <Notifications />
        <ProfileMenu />
      </Box>
    </Box>
  );
};

export default NavBar;

import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import Notifications from "./Notifications";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccessPanel from "../AccessPanel/AccessPanel";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
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
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{ padding: "8px" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          gap: "15px",
        }}
      >
        <Notifications />
        <ProfileMenu />
      </Box>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "200px",
            padding: "16px",
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{
            position: "absolute",
            top: "-3px",
            right: "-3px",
            zIndex: 20,
          }}
        >
          <CloseIcon sx={{ color: "#fbc02d", fontSize: "20px" }} />
        </IconButton>
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            width: { xs: "180px" },
            zIndex: 10,
            alignItems: "center",
            padding: "0 0 0 20px",
            height: "70px",
            bgcolor: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <Box>
            <img
              src="/images/weblogo%201.svg"
              alt="web logo"
              style={{
                width: "130px",
                height: "40px",
                marginTop: "0px",
              }}
            />
          </Box>
        </Box>
        <AccessPanel />
      </Drawer>
    </Box>
  );
};

export default NavBar;

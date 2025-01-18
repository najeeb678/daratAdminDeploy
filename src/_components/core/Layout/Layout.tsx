import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import NavBar from "@/_components/core/NavBar/NavBar";
import { useRouter } from "next/router";
import AccessPanel from "../AccessPanel/AccessPanel";
import MobileMenu from "../MobileMenu/MobileMenu";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const router = useRouter();

  const centerLayoutRoutes = ["/authentication/sign-in"];
  const isCenterLayout = centerLayoutRoutes.includes(router.pathname);

  if (isCenterLayout) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflowX: "hidden",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      {/* Top NavBar */}
      <Box
        sx={{
          position: "fixed",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #e4e8f8",
          height: "58px",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "16px",
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" } }}>
          <MobileMenu />
        </Box>

        {/* Navigation Bar */}
        <Box sx={{ flexGrow: 1 }}>
          <NavBar />
        </Box>
      </Box>

      {/* Left Sidebar */}
      <Box
        sx={{
          width: { sm: "200px", md: "200px", lg: "200px", xl: "200px" },
          border: "1px solid #CECECE",
          backgroundColor: "#FFFFFF",
          borderTopRightRadius: "10px",
          minHeight: "100vh",
          position: "fixed",
          display: { xs: "none", md: "block" },
          marginTop: "72px",
          display: { xs: "block", sm: "block", md: "block", lg: "block" }, // Show on small and medium screens, hide on large screens
          left: 0,
          overflowY: "auto",
          zIndex: 2,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none", // Firefox
        }}
      >
        <AccessPanel />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: "2px 16px 14px 16px",

          ml: { xs: "0px", md: "200px" },
          marginTop: "72px",
          overflow: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;  
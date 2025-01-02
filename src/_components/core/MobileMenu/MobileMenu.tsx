import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSidebarData } from "@/utils/SidebarData";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { getRole } from "@/utils/utils";
import { FaBars } from "react-icons/fa";

const MobileMenu = () => {
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 1150px)");

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await getRole();
      setRole(fetchedRole);
    };
    fetchRole();
  }, []);

  const sidebarData = getSidebarData(role);

  useEffect(() => {
    setIsClient(true);

    const currentSubMenu = sidebarData.find((item) =>
      item.subMenu?.some((subItem) => router.pathname.startsWith(subItem.path))
    );

    if (currentSubMenu?.subMenu) {
      const selectedSubMenuPath = currentSubMenu.subMenu.find((subItem) =>
        router.pathname.startsWith(subItem.path)
      )?.path;

      setSelectedPath(selectedSubMenuPath || null);
    }
  }, [router.pathname, sidebarData]);

  const handleSubMenuToggle = (item: any, index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    const firstSubMenuPath = item.subMenu?.[0]?.path;
    if (firstSubMenuPath) {
      setSelectedPath(firstSubMenuPath);
    }
  };

  const isActivePath = (path: string) => router.pathname === path;

  if (!isClient) return null;

  const renderSidebar = () => (
    <Box
      sx={{
        width: "150px",
        maxHeight: "calc(100vh - 60px)", // Adjust the height to allow for scrolling
        overflowY: "auto", // Enable vertical scrolling
        // paddingRight: "10px", // Optional padding to avoid content touching the scrollbar
      
      }}
    >
      {sidebarData.map((item, index) => {
        const Icon = item.icon;
        const isActive = isActivePath(item.path || "");
        const isSubMenuOpen = openIndex === index;

        return (
          <Box
            key={index}
            sx={{
              borderRadius: "8px",
              padding: isSubMenuOpen ? "0px 0px 5px 0px" : "0px",
              backgroundColor: isSubMenuOpen ? "#F5F5F5" : "",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            <Box
              sx={{
                height: "40px",
                padding: "12px 15px",
                gap: "12px",
                borderRadius: "8px",
                backgroundColor: isActive ? "#F5F5F5" : "",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                  "& .icon, & .text": {
                    color: "#FBC02D",
                  },
                },
              }}
              onClick={() => {
                if (!item.subMenu) {
                  setSelectedPath(item.path);
                  router.push(item.path || "");
                } else {
                  handleSubMenuToggle(item, index);
                }
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  className="icon"
                  sx={{
                    color: isActive ? "#FBC02D" : "#7B7B7B",
                    transition: "color 0.3s",
                  }}
                >
                  <Icon />
                </Box>
                <CustomTypography
                  className="text"
                  sx={{
                    marginLeft: "12px",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: isActive ? "#FBC02D" : "#7B7B7B",
                    transition: "color 0.3s",
                    
                  }}
                >
                  {item.title}
                </CustomTypography>
              </Box>
              {item.subMenu && (
                <Box sx={{ fontSize: "16px", color: "#FBC02D" }}>
                  {isSubMenuOpen ? (
                    <RiArrowDropDownLine />
                  ) : (
                    <RiArrowDropRightLine />
                  )}
                </Box>
              )}
            </Box>

            {item.subMenu && isSubMenuOpen && (
              <Box sx={{ paddingLeft: "15px", display: "flex", flexDirection: "column" }}>
                {item.subMenu.map((subItem, subIndex) => {
                  const isSubItemActive = isActivePath(subItem.path || "");
                  return (
                    <Box
                      key={subIndex}
                      sx={{
                        height: "40px",
                        padding: "8px 15px",
                        borderRadius: "8px",
                        backgroundColor: isSubItemActive ? "white" : "",
                        "&:hover": {
                          backgroundColor: "#F5F5F5",
                          "& .icon, & .text": {
                            color: "#FBC02D",
                          },
                        },
                      }}
                    >
                      <Link
                        href={subItem.path || "#"}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          className="icon"
                          sx={{
                            color: isSubItemActive ? "#FBC02D" : "#7B7B7B",
                            transition: "color 0.3s",
                          }}
                        >
                          {subItem.icon && <subItem.icon />}
                        </Box>
                        <CustomTypography
                          className="text"
                          sx={{
                            marginLeft: "12px",
                            fontWeight: "500",
                            fontSize: "12px",
                            color: isSubItemActive ? "#FBC02D" : "#7B7B7B",
                            transition: "color 0.3s",
                          }}
                        >
                          {subItem.title}
                        </CustomTypography>
                      </Link>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box>
      {(isSmallScreen || isMediumScreen) && (
        <Box sx={{ 
            position: "absolute", 
        top: "20px",
         left: "10px",
        //  marginRight: "20px"
          }}>
          <FaBars
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={handleMobileMenuToggle}
          />
        </Box>
      )}

      {(isSmallScreen || isMediumScreen) && mobileMenuOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            left: "0",
            width: "200px",
            // height:"100%",
            right: "0",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          {renderSidebar()}
        </Box>
      )}
    </Box>
  );
};

export default MobileMenu;

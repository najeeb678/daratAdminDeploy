import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { sidebarData } from "@/utils/SidebarData";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

const AccessPanel = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track open submenu by index
  const [selectedPath, setSelectedPath] = useState<string | null>(null); // Track selected path for navigation
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    // Find the current submenu path if the current route matches one of the submenus
    const currentSubMenu = sidebarData.find((item) =>
      item.subMenu?.some((subItem) => router.pathname.startsWith(subItem.path))
    );

    if (currentSubMenu && currentSubMenu.subMenu) {
      const selectedSubMenuPath = currentSubMenu.subMenu.find((subItem) =>
        router.pathname.startsWith(subItem.path)
      )?.path;

      if (selectedSubMenuPath) {
        setSelectedPath(selectedSubMenuPath);
      }
    }
  }, [router.pathname]);
  const handleSubMenuToggle = (item: any, index: number) => {
    if (openIndex === index) {
      // If submenu is already open, close it
      setOpenIndex(null);
    } else {
      // If submenu is closed, open it
      setOpenIndex(index);

      // Automatically select the first submenu item if available
      const firstSubMenuPath = item.subMenu?.[0]?.path;
      if (firstSubMenuPath) {
        setSelectedPath(firstSubMenuPath); // Select the first submenu item path
      }
    }
  };

  const isActivePath = (path: string) => router.pathname === path;
  if (!isClient) return null; 
  return (
    <Box
      sx={{
        width: "150px",
        height: "auto",
        position: "absolute",
        top: "25px",
        left: "25px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      {sidebarData.map((item, index) => {
        const Icon = item.icon;
        const isActive = isActivePath(item.path || ""); // Check if main menu item is active
        const isSubMenuOpen = openIndex === index; // Check if this submenu is open

        return (
          <Box
            key={index}
            sx={{
              width: "150px",
              borderRadius: "8px",
              padding: isSubMenuOpen ? "0px 0px 5px 0px " : "0px",
              backgroundColor: isSubMenuOpen ? "#F5F5F5" : "",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            <Box
              sx={{
                width: "150px",
                height: "40px",
                padding: "12px 70px 12px 14.9px",
                gap: "12px",
                borderRadius: "8px",
                backgroundColor: isActive ? "#F5F5F5" : "",
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
                } else {
                  handleSubMenuToggle(item, index);
                }
              }}
            >
              <Link
                href={item.path || "#"}
                style={{
                  display: "flex",
                  textDecoration: "none",
                }}
              >
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
                    marginBottom: "4px",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "16.39px",
                    marginLeft: "12px",
                    color: isActive ? "#FBC02D" : "#7B7B7B",
                    transition: "color 0.3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </CustomTypography>
                {item.subMenu && (
                  <Box
                    sx={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      color: "#FBC02D",
                      fontWeight: "500",
                      marginTop: "-3.7px",
                    }}
                  >
                    {isSubMenuOpen ? (
                      <RiArrowDropDownLine
                        style={{ width: "25px", height: "25px" }}
                      />
                    ) : (
                      <RiArrowDropRightLine
                        style={{ width: "25px", height: "25px" }}
                      />
                    )}
                  </Box>
                )}
              </Link>
            </Box>

            {/* Render submenu items */}
            {item.subMenu && isSubMenuOpen && (
              <Box
                sx={{
                  paddingLeft: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item.subMenu.map((subItem, subIndex) => {
                  const isSubItemActive = isActivePath(subItem.path || "");
                  return (
                    <Box
                      key={subIndex}
                      sx={{
                        width: "138px",
                        height: "40px",
                        padding: "12px 70px 12px 14.95px",
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
                            marginBottom: "4px",
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "16.39px",
                            marginLeft: "12px",
                            color: isSubItemActive ? "#FBC02D" : "#7B7B7B",
                            transition: "color 0.3s",
                            whiteSpace: "nowrap",
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
};

export default AccessPanel;



import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { AppDispatch } from "@/redux/store";
import { getRole } from "@/utils/utils";
import { format } from "date-fns";
import {
  getNotificationByRole,
  markAsReadAdminNotifications,
  markAsReadDoctorNotifications,
} from "@/redux/slices/authSlice";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import NotificationModal from "./NotificationsModal";
const commonButtonStyles = {
  height: "24px",
  width: "69px",
  backgroundColor: "#f5f5f5",
  borderRadius: "30px",
  border: "none",
  fontFamily: "Avenir",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "14px",
};
const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  // const [notifications, setNotifications] = useState<any[]>(dummyNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const formatDate = (date: string | Date): string => {
    return format(new Date(date), "EEEE, dd MMM yyyy");
  };
  const formatDateTime = (date: string | Date): string => {
    try {
      const formattedDate = format(new Date(date), "hh:mm a, dd MMM yyyy");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", date, error);
      return "Invalid Date"; // Fallback or default value
    }
  };
  const fetchNotifications = () => {
    const userRole = getRole();
    setRole(userRole);
    dispatch(getNotificationByRole(userRole === "Admin" ? "Admin" : "Doctor"))
      .unwrap()
      .then((res: any) => {
        setNotifications(res);
        setUnreadCount(res.filter((notif: any) => !notif.read).length);
      })
      .catch((error) => console.error("Failed to fetch notifications:", error));
  };
  useEffect(() => {
    fetchNotifications();
  }, [dispatch]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);

    // if (selectedNotification && !selectedNotification.read) {
    //   handleMarkAsRead(selectedNotification.id);
    // }
  };
  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };
  const handleAction = async (
    notifId: string,
    action: "confirm" | "cancel"
  ) => {
    // Call API based on action
    try {
      if (action === "confirm") {
        await dispatch(markAsReadAdminNotifications({ id: notifId })).unwrap();
      } else {
        await dispatch(markAsReadDoctorNotifications({ id: notifId })).unwrap();
      }
      setNotifications((prev) => prev.filter((notif) => notif.id !== notifId));
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const handleSeeAll = () => {
    router.push("/notifications");
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="warning">
          <NotificationsNoneOutlinedIcon
            sx={{ color: "#7B7B7B", width: "26px", height: "26px" }}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "505px",
            maxHeight: "500px",
            overflowY: "auto",
            padding: "10px 16px 5px 16px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTypography
            sx={{
              fontWeight: "450",
              fontSize: "16px",
            }}
          >
            Notifications
          </CustomTypography>
          <CustomTypography
            sx={{
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "14px",
              fontFamily: "Avenir",
            }}
          >
            {formatDate(new Date())}
          </CustomTypography>
        </Box>

        <Divider />
        {notifications.map((notif: any) => (
          <MenuItem
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            sx={{
              display: "block",
              padding: "16px",
              fontFamily: "Avenir",
              height: "66px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "inherit",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <CustomTypography
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Avenir",
                  }}
                >
                  {notif.Appointment?.patientId?.name}
                </Typography>{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#A6A6A6",
                    fontWeight: "400",
                    fontSize: "12px",
                    fontFamily: "Avenir",
                  }}
                >
                  has booked an appointment for the{" "}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "black",
                    fontFamily: "Avenir",
                  }}
                >
                  {notif.Appointment?.subService?.name}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "#A6A6A6",
                    fontWeight: "400",
                    fontSize: "12px",
                    fontFamily: "Avenir",
                  }}
                >
                  {" "}
                  on
                </Typography>
                <br />
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "black",
                    fontFamily: "Avenir",
                  }}
                >
                  {formatDateTime(notif.Appointment?.startTime)}{" "}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "black",
                    fontFamily: "Avenir",
                  }}
                >
                  with {notif.Appointment?.doctorId?.name}
                </Typography>
              </CustomTypography>
              <Typography
                component="span"
                sx={{
                  fontWeight: "400",
                  color: "#A6A6A6",
                  fontSize: "10px",
                  fontFamily: "Avenir",
                }}
              >
                {format(new Date(notif.Appointment?.createdAt), "hh:mm a")}
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "-12px",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                sx={{
                  ...commonButtonStyles,
                  color: "#7B7B7B",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    color: "#333",
                  },
                  "&:active": {
                    backgroundColor: "#d6d6d6",
                    borderColor: "#aaa",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleAction(notif.id, "cancel");
                }}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  ...commonButtonStyles,
                  color: "#087C31",
                  "&:hover": {
                    backgroundColor: "#e0f7e5",
                    color: "#087C31",
                  },
                  "&:active": {
                    backgroundColor: "#c9e5d3",
                    borderColor: "#087C31",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleAction(notif.id, "confirm");
                }}
              >
                Confirm
              </Button>
            </Box> */}
          </MenuItem>
        ))}
        <Divider />
        <Box sx={{ textAlign: "center" }}>
          <Button variant="text" onClick={handleSeeAll}>
            <CustomTypography
              sx={{
                fontWeight: "500",
                fontSize: "12px",
                fontFamily: "Avenir",
                lineHeight: "14px",
              }}
            >
              See All
            </CustomTypography>
          </Button>
        </Box>
      </Menu>

      <CustomModal
        open={isModalOpen}
        title={"Notification"}
        handleClose={handleModalClose}
        modalWidth="50%"
      >
        <NotificationModal
          selectedNotification={selectedNotification}
          handleModalClose={handleModalClose}
        />
      </CustomModal>
    </>
  );
};

export default Notifications;

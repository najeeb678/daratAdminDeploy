import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getRole } from "@/utils/utils";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Badge,
  Box,
  Typography,
  Button,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  getNotificationByRole,
  markAsReadAdminNotifications,
  markAsReadDoctorNotifications,
} from "@/redux/slices/authSlice";
import CustomModal from "@/_components/common/CustomModal/CustomModal";

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [role, setRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  useEffect(() => {
    const userRole = getRole();
    setRole(userRole);
    dispatch(getNotificationByRole(userRole === "Admin" ? "Admin" : "Doctor"))
      .unwrap()
      .then((res: any) => {
        setNotifications(res);
        setUnreadCount(res.filter((notif: any) => !notif.read).length);
      });
  }, [dispatch]);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const payload = { notificationId };

      if (role === "Admin") {
        await dispatch(markAsReadAdminNotifications(payload)).unwrap();
      } else if (role === "Doctor") {
        await dispatch(markAsReadDoctorNotifications(payload)).unwrap();
      }

      const updatedNotifications = notifications.map((notif: any) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );

      setNotifications(updatedNotifications);
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);

    if (selectedNotification && !selectedNotification.read) {
      handleMarkAsRead(selectedNotification.id);
    }
  };

  return (
    <>
      <IconButton onClick={() => toggleDrawer(true)}>
        <Badge badgeContent={unreadCount} color="warning">
          <NotificationsNoneOutlinedIcon
            sx={{ color: "#7B7B7B", width: "26px", height: "26px" }}
          />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <List sx={{ width: 300 }}>
          <ListItem>
            <ListItemText primary="Notifications" />
          </ListItem>
          <Divider />
          {notifications.map((notif: any) => (
            <ListItem
              key={notif.id}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "var(--font-raleway)",
              }}
              onClick={() => handleNotificationClick(notif)}
            >
              <Avatar sx={{ marginRight: 2 }}>N</Avatar>
              <ListItemText primary={notif.title} secondary={notif.body} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <CustomModal
        open={isModalOpen}
        title={""}
        handleClose={handleClose}
        modalWidth="50%"
      >
        {selectedNotification ? (
          <Box sx={{ padding: "16px" }}>
            <Typography
              fontFamily="var(--font-raleway)"
              sx={{ marginBottom: "16px", fontWeight: "bold" }}
            >
              {selectedNotification.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "16px" }}>
              {selectedNotification.body}
            </Typography>
            {selectedNotification.Appointment && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", marginBottom: "8px" }}
                >
                  Appointment Details:
                </Typography>
                <Typography variant="body2">
                  <strong>Patient:</strong> John
                </Typography>
                <Typography variant="body2">
                  <strong>Doctor:</strong> Rizwan Don
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong>{" "}
                  {new Date(
                    selectedNotification.Appointment.scheduledDate
                  ).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Time:</strong>{" "}
                  {`${new Date(
                    selectedNotification.Appointment.startTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${new Date(
                    selectedNotification.Appointment.endTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong>{" "}
                  {selectedNotification.Appointment.status}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Fee:</strong> $
                  {selectedNotification.Appointment.TotalFee}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "700 !important",
                  fontFamily: "Avenir !important",
                  lineHeight: "18px !important",
                  width: "100px !important",
                  borderRadius: "5px !important",
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
                onClick={(e: any) => {
                  handleClose();
                }}
              >
                Okay
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">No details available.</Typography>
        )}
      </CustomModal>
    </>
  );
};

export default Notifications;

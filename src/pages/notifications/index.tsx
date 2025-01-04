import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  ToggleButton,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import NotificationModal from "@/_components/core/NavBar/NotificationsModal";
import {
  markAllAdminNotificationAsRead,
  markAllDoctorNotificationAsRead,
  markAsReadAdminNotifications,
  markAsReadDoctorNotifications,
} from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { formatRelativeTime, getRole, getUserId } from "@/utils/utils";

const NotificationDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [role, setRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  // markallasRead
  // markAllAdminNotificationAsRead,
  //   markAllDoctorNotificationAsRead
  const notificationsData = useSelector(
    (state: any) => state.auth.notifications
  );
  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    setNotifications(notificationsData);
  }, [notificationsData]);
  useEffect(() => {
    const userRole = getRole();
    setRole(userRole);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const formatDate = (date: string | Date): string => {
    return format(new Date(date), "EEEE, dd MMM yyyy");
  };
  const formatDateTime = (date: string | Date): string => {
    return format(new Date(date), "hh:mm a, dd MMM yyyy");
  };

  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMarkAllAsRead = (event: any) => {
    const checked = event.target.checked;

    setIsChecked(!checked);
    if (!isChecked) {
      return;
    }

    const markAllAction =
      role === "Admin"
        ? markAllAdminNotificationAsRead
        : markAllDoctorNotificationAsRead;

    dispatch(markAllAction())
      .unwrap()
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        );
      })
      .catch((error) =>
        console.error("Failed to mark all notifications as read:", error)
      );
  };
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px 25px 10px 25px",
        marginBottom: "8px",
        overflow: "auto",
        border: "1px solid #CECECE",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomTypography
          sx={{
            fontWeight: "450",
            fontSize: "16px",
            lineHeight: "20px",
            marginBottom: "8px",
          }}
        >
          Notifications
        </CustomTypography>
        <Box sx={{ display: "flex" }}>
          <CustomTypography
            sx={{
              fontWeight: "450",
              fontSize: "16px",
              lineHeight: "20px",
            }}
          >
            Mark All as Read
          </CustomTypography>
          <Switch
            value="markAllAsRead"
            onChange={handleMarkAllAsRead}
            sx={{
              marginTop: "-8px",
              color: "#F0A000",
              "&.Mui-checked": {
                color: "#F0A000",
              },
              "&.Mui-checked + .MuiFormControlLabel-label": {
                color: "#F0A000", // Ensures label color changes too
              },
              "&.Mui-checked:hover": {
                backgroundColor: "#F0A000",
              },
              "&.Mui-checked.Mui-selected": {
                backgroundColor: "#F0A000",
              },
            }}
          />
        </Box>
        {/* <FormControlLabel
          control={
            <Switch
              value="markAllAsRead"
              onChange={handleMarkAllAsRead}
              sx={{
                color: "#F0A000",
                "&.Mui-checked": {
                  color: "#F0A000",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "#F0A000",
                },
                "&.Mui-checked.Mui-selected": {
                  backgroundColor: "#A6A6A6",
                },
                marginBottom: "16px",
              }}
            />
          }
          label=""
          labelPlacement="start"
        /> */}
      </Box>
      {notifications?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "40vh",
            textAlign: "center",
          }}
        >
          <img
            src="/images/no-data.png"
            alt="No Data"
            style={{
              width: "150px",
              height: "auto",
              marginBottom: "20px",
            }}
          />
          <Typography variant="h6" color="textSecondary">
            No notifications available
          </Typography>
        </Box>
      )}
      {role === "Doctor"
        ? notifications?.map((notif: any) => (
            <Box
              key={notif.id}
              onClick={() => {
                if (!notif.read) {
                  dispatch(
                    markAsReadDoctorNotifications({
                      notificationId: notif.id,
                      doctorId: userId,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      setNotifications((prev) =>
                        prev.map((n) =>
                          n.id === notif.id ? { ...n, read: true } : n
                        )
                      );
                    })
                    .catch((error) =>
                      console.error(
                        "Failed to mark notification as read:",
                        error
                      )
                    );
                }
                handleNotificationClick(notif);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "10px 0",
                backgroundColor: notif.read ? "#F5F5F5" : "#FBC02D1F",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor: notif.read ? "#E0E0E0" : "#F0F0F0", // Adjust hover color
                  color: "inherit",
                },
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <CircleIcon
                sx={{
                  color: notif.read ? "#A6A6A6" : "#FBC02D", // Gray for read, highlighted for unread
                  fontSize: "12px",
                  margin: "0px 8px",
                }}
              />

              <CustomTypography
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  fontFamily: "Avenir",
                  minWidth: "130px",
                }}
              >
                {formatDate(notif?.Appointment?.startTime)}
              </CustomTypography>
              <CustomTypography
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  fontFamily: "Avenir",
                  minWidth: "70px",
                }}
              >
                {format(new Date(notif?.Appointment?.createdAt), "hh:mm a")}
              </CustomTypography>

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
                  {notif?.Appointment?.patientId?.name}{" "}
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
                  {notif?.Appointment?.subService?.name}
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
                  on{" "}
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
                  {formatDateTime(notif?.Appointment?.startTime)}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "black",
                    fontFamily: "Avenir",
                  }}
                ></Typography>
              </CustomTypography>
            </Box>
          ))
        : notifications?.map((notif: any) => (
            <Box
              key={notif.id}
              onClick={() => {
                if (!notif.read) {
                  const markAsReadAction =
                    role === "Admin"
                      ? markAsReadAdminNotifications
                      : markAsReadDoctorNotifications;

                  dispatch(markAsReadAction({ notificationId: notif.id }))
                    .unwrap()
                    .then(() => {
                      setNotifications((prev) =>
                        prev.map((n) =>
                          n.id === notif.id ? { ...n, read: true } : n
                        )
                      );
                    })
                    .catch((error) =>
                      console.error(
                        "Failed to mark notification as read:",
                        error
                      )
                    );
                }
                handleNotificationClick(notif);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "500px",
                gap: "20px",
                padding: "10px 0",
                backgroundColor: notif.read ? "#F5F5F5" : "#FBC02D1F",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor: notif.read ? "#E0E0E0" : "#F0F0F0", // Adjust hover color
                  color: "inherit",
                },
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <CircleIcon
                sx={{
                  color: notif.read ? "#A6A6A6" : "#FBC02D", // Gray for read, highlighted for unread
                  fontSize: "12px",
                  margin: "0px 8px",
                }}
              />

              <CustomTypography
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  fontFamily: "Avenir",
                  minWidth: "130px",
                }}
              >
                {notif.type === "order"
                  ? formatDate(notif.Orders?.created_at)
                  : formatDate(notif.Appointment?.startTime)}
              </CustomTypography>
              <CustomTypography
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  fontFamily: "Avenir",
                  minWidth: "70px",
                }}
              >
                {notif.type === "order"
                  ? formatRelativeTime(notif.createdAt)
                  : formatRelativeTime(notif.Appointment.createdAt)}
                {/* {notif.type === "order"
                  ? format(new Date(notif.createdAt), "hh:mm a")
                  : format(new Date(notif.Appointment.createdAt), "hh:mm a")} */}
              </CustomTypography>

              <CustomTypography
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                {" "}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Avenir",
                  }}
                >
                  {notif.type === "order"
                    ? notif.Orders?.customer_id?.name
                    : notif.Appointment?.patientId?.name}
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
                  {notif.type === "order"
                    ? " has placed an order with ID "
                    : " has booked an appointment for the "}
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
                  {notif.type === "order"
                    ? notif.Orders?.unique_code
                    : notif.Appointment?.subService?.name}
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
                  on{" "}
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
                  {notif.type === "order"
                    ? `${format(new Date(notif.createdAt), "hh:mm a")}.`
                    : formatDateTime(notif.Appointment?.startTime)}{" "}
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
                  {notif.type === "order"
                    ? ""
                    : `with ${notif.Appointment?.doctorId?.name}.`}
                </Typography>
              </CustomTypography>
            </Box>
          ))}

      <CustomModal
        open={isModalOpen}
        title={"Notification"}
        handleClose={handleModalClose}
        modalWidth="50%"
      >
        <NotificationModal
          selectedNotification={selectedNotification}
          handleModalClose={handleModalClose}
          role={role}
        />
      </CustomModal>
    </Box>
  );
};

export default NotificationDetail;

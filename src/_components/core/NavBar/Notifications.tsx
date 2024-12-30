let dummyNotifications = [
  {
    id: "1a2b3c4d-1234-5678-9abc-def123456789",
    patient: null,
    doctorId: null,
    title: "New Appointment",
    body: "Alice has booked an appointment with Dr. Smith",
    type: "booking",
    read: false,
    createdAt: "2024-12-29T10:00:00.000Z",
    appointmentId: "12345678-abcd-efgh-ijkl-9876543210mn",
    orderId: null,
    Appointment: {
      id: "12345678-abcd-efgh-ijkl-9876543210mn",
      patient: "87654321-nmlk-jihg-fedc-ba0987654321",
      doctor: "45678912-abcd-efgh-ijkl-1234567890op",
      subTotalFee: 150,
      TotalFee: 150,
      discount: 0,
      subServiceId: "34567890-abcd-efgh-ijkl-1234567890qr",
      scheduledDate: "2024-12-30T00:00:00.000Z",
      startTime: "2024-12-30T09:00:00.000Z",
      endTime: "2024-12-30T09:30:00.000Z",
      weekday: "Monday",
      status: "Confirmed",
      paymentMethod: "Card",
      name: "Alice",
      email: "alice@example.com",
      contactNo: "1234567890",
      dob: "1990-01-01",
      createdAt: "2024-12-29T10:00:00.000Z",
      updatedAt: "2024-12-29T10:10:00.000Z",
      is_Active: true,
      is_Deleted: false,
    },
    Orders: null,
  },
  {
    id: "2b3c4d5e-2345-6789-abcd-ef123456789a",
    patient: null,
    doctorId: null,
    title: "Follow-up Appointment",
    body: "Bob has booked a follow-up with Dr. Lee",
    type: "follow-up",
    read: true,
    createdAt: "2024-12-28T15:00:00.000Z",
    appointmentId: "23456789-bcde-fghi-jklm-8765432109op",
    orderId: null,
    Appointment: {
      id: "23456789-bcde-fghi-jklm-8765432109op",
      patient: "65432109-nmlk-jihg-fedc-ba0123456789",
      doctor: "56789012-cdef-ghij-klmn-0123456789qr",
      subTotalFee: 100,
      TotalFee: 90,
      discount: 10,
      subServiceId: "45678901-cdef-ghij-klmn-0123456789st",
      scheduledDate: "2024-12-29T00:00:00.000Z",
      startTime: "2024-12-29T14:00:00.000Z",
      endTime: "2024-12-29T14:30:00.000Z",
      weekday: "Sunday",
      status: "Pending",
      paymentMethod: "Cash",
      name: "Bob",
      email: "bob@example.com",
      contactNo: "0987654321",
      dob: "1985-05-10",
      createdAt: "2024-12-28T15:00:00.000Z",
      updatedAt: "2024-12-28T15:05:00.000Z",
      is_Active: true,
      is_Deleted: false,
    },
    Orders: null,
  },
  {
    id: "3c4d5e6f-3456-7890-cdef-gh123456789b",
    patient: null,
    doctorId: null,
    title: "Urgent Appointment",
    body: "Charlie has an urgent consultation with Dr. Brown",
    type: "urgent",
    read: false,
    createdAt: "2024-12-29T08:30:00.000Z",
    appointmentId: "34567890-defg-hijk-lmno-6543210987qr",
    orderId: null,
    Appointment: {
      id: "34567890-defg-hijk-lmno-6543210987qr",
      patient: "54321098-onml-kjih-gfed-cba987654321",
      doctor: "67890123-defg-hijk-lmno-1234567890uv",
      subTotalFee: 250,
      TotalFee: 250,
      discount: 0,
      subServiceId: "56789012-defg-hijk-lmno-1234567890wx",
      scheduledDate: "2024-12-29T00:00:00.000Z",
      startTime: "2024-12-29T10:00:00.000Z",
      endTime: "2024-12-29T10:30:00.000Z",
      weekday: "Sunday",
      status: "Confirmed",
      paymentMethod: null,
      name: "Charlie",
      email: "charlie@example.com",
      contactNo: "9876543210",
      dob: "1992-07-20",
      createdAt: "2024-12-29T08:30:00.000Z",
      updatedAt: "2024-12-29T08:45:00.000Z",
      is_Active: true,
      is_Deleted: false,
    },
    Orders: null,
  },
  {
    id: "4d5e6f7g-4567-8901-defg-hi234567890c",
    patient: null,
    doctorId: null,
    title: "Routine Check-up",
    body: "Diana has scheduled a routine check-up with Dr. Taylor",
    type: "routine",
    read: true,
    createdAt: "2024-12-27T12:00:00.000Z",
    appointmentId: "45678901-efgh-ijkl-mnop-5432109876wx",
    orderId: null,
    Appointment: {
      id: "45678901-efgh-ijkl-mnop-5432109876wx",
      patient: "43210987-nmlk-jihg-fedc-cba876543210",
      doctor: "78901234-efgh-ijkl-mnop-1234567890yz",
      subTotalFee: 180,
      TotalFee: 160,
      discount: 20,
      subServiceId: "67890123-efgh-ijkl-mnop-1234567890za",
      scheduledDate: "2024-12-28T00:00:00.000Z",
      startTime: "2024-12-28T11:00:00.000Z",
      endTime: "2024-12-28T11:30:00.000Z",
      weekday: "Saturday",
      status: "Completed",
      paymentMethod: "Credit Card",
      name: "Diana",
      email: "diana@example.com",
      contactNo: "8765432109",
      dob: "1988-03-15",
      createdAt: "2024-12-27T12:00:00.000Z",
      updatedAt: "2024-12-27T12:15:00.000Z",
      is_Active: true,
      is_Deleted: false,
    },
    Orders: null,
  },
];

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

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>(dummyNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const formatDate = (date: string | Date): string => {
    return format(new Date(date), "EEEE, dd MMM yyyy");
  };
  const formatDateTime = (date: string | Date): string => {
    return format(new Date(date), "hh:mm a, dd MMM yyyy");
  };

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

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            padding: "10px 16px",
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
            sx={{
              display: "block",
              padding: "16px",
              fontFamily: "Avenir",
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
                  {notif.Appointment?.name}
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
                  Dental Service
                  {/* {notif.Appointment?.subServiceId} */}
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
                  with Dr.Hassan
                  {/* with Dr. {notif.Appointment?.doctor}. //TODO:change name*/}
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
                6:20pm
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                sx={{
                  height: "24px",
                  width: "69px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "30px",
                  border: "none",
                  color: "#7B7B7B",
                  fontFamily: "Avenir",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "14px",
                }}
                onClick={() => handleAction(notif.id, "cancel")}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  height: "24px",
                  width: "69px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "30px",
                  border: "none",
                  color: "#087C31",
                  fontFamily: "Avenir",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "14px",
                }}
                onClick={() => handleAction(notif.id, "confirm")}
              >
                Confirm
              </Button>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <Box sx={{ textAlign: "center", padding: "8px" }}>
          <Button variant="text" onClick={handleSeeAll}>
            See All
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default Notifications;

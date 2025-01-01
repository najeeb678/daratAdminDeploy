import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

let data = [
  {
    id: "1590e4dc-5352-43fe-b777-7f6eb1e830db",
    patient: null,
    doctorId: null,
    title: "New Appointment",
    body: "John Riz has booked an appointment with Dr. Hassan",
    type: "booking",
    read: true,
    createdAt: "2024-12-31T12:20:23.279Z",
    appointmentId: "ba0e7c0b-86d1-4fba-8340-5b3972c07c72",
    orderId: null,
    Appointment: {
      id: "ba0e7c0b-86d1-4fba-8340-5b3972c07c72",
      patient: "b4dd3547-f24c-401f-931f-7b159f4f0b40",
      doctor: "f35f788e-f3b6-4735-b27a-24e4068fdd87",
      subTotalFee: 200,
      TotalFee: 200,
      discount: 0,
      subServiceId: "b4592f04-7738-40c8-b1e3-73d956375e2d",
      scheduledDate: "2025-01-01T00:00:00.000Z",
      startTime: "2025-01-01T13:30:00.000Z",
      endTime: "2025-01-01T14:00:00.000Z",
      weekday: "Wednesday",
      status: "Confirmed",
      paymentMethod: null,
      name: null,
      email: null,
      contactNo: null,
      dob: null,
      createdAt: "2024-12-31T12:20:20.378Z",
      updatedAt: "2024-12-31T12:20:22.698Z",
      is_Active: true,
      is_Deleted: false,
      doctorId: {
        name: "Dr. Hassan",
      },
      patientId: {
        name: "John Riz",
      },
      subService: {
        name: "Dental Flossing",
      },
    },
    Orders: null,
  },
  {
    id: "1fedd77c-75a6-4dc4-b26a-92b116a8d3d4",
    patient: null,
    doctorId: null,
    title: "New Order",
    body: "Mehad Nadeem has placed a new order with order number ORDER-1735721581522",
    type: "order",
    read: false,
    createdAt: "2025-01-01T08:53:05.391Z",
    appointmentId: null,
    orderId: "9177c183-2704-4095-87c1-0578ac394e3e",
    Appointment: null,
    Orders: {
      id: "9177c183-2704-4095-87c1-0578ac394e3e",
      addressId: "4fd1b29c-a257-401d-8acf-e513362d8fec",
      unique_code: "ORDER-1735721581522",
      customerId: "9ace1997-4710-4a8a-b6c1-2f16e8880436",
      notes: "",
      price: 800,
      totalPrice: 810,
      totalDiscount: 0,
      quantity: 4,
      paymentMethod: "Cash",
      status: "CONFIRMED",
      deliveryDate: null,
      refundId: null,
      created_at: "2025-01-01T08:53:01.523Z",
      updated_at: "2025-01-01T08:53:03.605Z",
      deleted_at: false,
      deliveryFeeId: "06dcdfef-f894-4ba6-a632-2ed71c1c45a8",
      customer_id: {
        name: "Mehad Nadeem",
      },
      orderItems: [
        {
          id: "611e9272-608b-4d41-bc09-3d38176663c5",
          itemId: "5aeff5a2-a529-4764-be7a-5da0f6f59e99",
          colorId: null,
          orderId: "9177c183-2704-4095-87c1-0578ac394e3e",
          quantity: 1,
          price: 200,
          discount: null,
          created_at: "2025-01-01T08:53:03.008Z",
          updated_at: "2025-01-01T08:53:03.008Z",
          deleted_at: false,
        },
      ],
    },
  },
];
const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const unreadNotificationCount = useSelector(
    (state: any) => state.auth.unreadNotificationCount
  );

  const formatDate = (date: string | Date): string => {
    return format(new Date(date), "EEEE, dd MMM yyyy");
  };
  const formatDateTime = (date: string | Date): string => {
    try {
      const formattedDate = format(new Date(date), "hh:mm a, dd MMM yyyy");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", date, error);
      return "Invalid Date";
    }
  };
  const fetchNotifications = () => {
    const userRole = getRole();
    setRole(userRole);
    dispatch(getNotificationByRole(userRole === "Admin" ? "Admin" : "Doctor"))
      .unwrap()
      .then((res: any) => {
        if (Array.isArray(res)) {
          setNotifications(res);
        }
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
  };
  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };
  const handleSeeAll = () => {
    router.push("/notifications");
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={unreadNotificationCount} color="warning">
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

        <Divider sx={{ marginBottom: "8px" }} />
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
        {notifications.map((notif: any) => (
          <MenuItem
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
                    console.error("Failed to mark notification as read:", error)
                  );
              }
              handleNotificationClick(notif);
            }}
            sx={{
              display: "block",
              padding: "16px",
              fontFamily: "Avenir",
              height: "66px",
              backgroundColor: notif.read ? "#F5F5F5" : "#FBC02D1F",
              marginBottom: "8px",
              "&:hover": {
                backgroundColor: notif.read ? "#E0E0E0" : "#F0F0F0", // Adjust hover color
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
                  {" "}
                  {notif.type === "order"
                    ? notif.Orders?.customer_id?.name
                    : notif.Appointment?.patientId?.name}
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
                  {notif.type === "order"
                    ? "has placed an order with ID "
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
                {notif.type === "order" ? <br /> : ""}
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
                {notif.type === "order" ? " " : <br />}
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
                    ? `${formatDateTime(notif.Orders?.created_at)}.`
                    : formatDateTime(notif.Appointment?.startTime)}
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
                    : `with ${notif.Appointment?.doctorId?.name}`}
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
                {notif.type === "order"
                  ? format(new Date(notif.createdAt), "hh:mm a")
                  : format(new Date(notif.Appointment.createdAt), "hh:mm a")}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        {notifications?.length > 3 && (
          <>
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
          </>
        )}
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

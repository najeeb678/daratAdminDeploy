import React, { useState } from "react";
import { Box, Button, Checkbox, Typography, Divider } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { useSelector } from "react-redux";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import NotificationModal from "@/_components/core/NavBar/NotificationsModal";

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
const NotificationDetail = () => {
  const router = useRouter();
  const notificationsData = useSelector(
    (state: any) => state.auth.notifications
  );
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
  const handleAction = async (
    notifId: string,
    action: "confirm" | "cancel" | "view"
  ) => {
    // Handle action (confirm, cancel, view) here
    console.log(`Action: ${action} for Notification ID: ${notifId}`);
    // You can dispatch actions or call APIs based on the action
  };
  const handleModalClose = () => {
    setIsModalOpen(false);

    // if (selectedNotification && !selectedNotification.read) {
    //   handleMarkAsRead(selectedNotification.id);
    // }
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
      <CustomTypography
        sx={{
          fontWeight: "450",
          fontSize: "16px",
          lineHeight: "20px",
        }}
      >
        Notifications
      </CustomTypography>

      {notificationsData?.map((notif: any) => (
        <Box
          key={notif.id}
          onClick={() => handleNotificationClick(notif)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "10px 0",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <CustomCheckbox
            isDisabled
            onChange={() => {
              console.log("Selected :");
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
            {formatDate(notif.Appointment?.startTime)}
          </CustomTypography>
          <CustomTypography
            sx={{
              fontWeight: "400",
              fontSize: "12px",
              fontFamily: "Avenir",
              minWidth: "70px",
            }}
          >
            {format(new Date(notif.Appointment?.createdAt), "hh:mm a")}
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
              {notif.Appointment?.patientId?.name}
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

          {/* <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
              variant="outlined"
              onClick={() => handleAction(notif.id, "cancel")}
              sx={{ ...commonButtonStyles, color: "#7B7B7B" }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleAction(notif.id, "confirm")}
              sx={{ ...commonButtonStyles, color: "#087C31" }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleAction(notif.id, "view")}
              sx={{ ...commonButtonStyles }}
            >
              View
            </Button>
          </Box> */}
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
        />
      </CustomModal>
    </Box>
  );
};

export default NotificationDetail;

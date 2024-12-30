import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";


const NotificationDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const [notification, setNotification] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getNotificationById(id as string))
  //       .unwrap()
  //       .then((res) => {
  //         setNotification(res);
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [dispatch, id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!notification) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">Notification not found for id {id}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        {notification.title}||{id}
      </Typography>
      <Typography variant="body1">{notification.body}</Typography>
      {notification.Appointment && (
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Appointment Details:
          </Typography>
          <Typography variant="body2">Patient: John</Typography>
          <Typography variant="body2">Doctor: Rizwan Don</Typography>
          <Typography variant="body2">
            Date:{" "}
            {new Date(notification.Appointment.scheduledDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Time:{" "}
            {`${new Date(
              notification.Appointment.startTime
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(
              notification.Appointment.endTime
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </Typography>
          <Typography variant="body2">Status: {notification.Appointment.status}</Typography>
          <Typography variant="body2">Total Fee: ${notification.Appointment.TotalFee}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default NotificationDetail;

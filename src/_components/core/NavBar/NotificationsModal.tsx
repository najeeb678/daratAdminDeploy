import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { format } from "date-fns";

interface Appointment {
  patientId: {
    name: string;
  };
  doctorId: {
    name: string;
  };
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: string;
  TotalFee: number;
}

interface NotificationModalProps {
  selectedNotification: {
    title: string;
    body: string;
    Appointment?: Appointment;
  } | null;
  handleModalClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  selectedNotification,
  handleModalClose,
}) => {
  return (
    <Box sx={{ padding: "16px" }}>
      {selectedNotification ? (
        <>
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
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <strong>Patient:</strong>{" "}
                {selectedNotification.Appointment.patientId.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <strong>Doctor:</strong>{" "}
                {selectedNotification.Appointment.doctorId.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <strong>Date:</strong>{" "}
                {format(
                  new Date(selectedNotification.Appointment.scheduledDate),
                  "MM/dd/yyyy"
                )}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <strong>Time:</strong>{" "}
                {`${format(
                  new Date(selectedNotification.Appointment.startTime),
                  "h:mm a"
                )} - ${format(
                  new Date(selectedNotification.Appointment.endTime),
                  "h:mm a"
                )}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <strong>Status:</strong>{" "}
                {selectedNotification.Appointment.status}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  gap: "100px",
                  marginBottom: "8px",
                }}
              >
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
                  backgroundColor: "#FBC02D !important",
                  color: "white !important",
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05)",
                  transform: "scale(1.005)",
                },
              }}
              onClick={handleModalClose}
            >
              Okay
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">No details available.</Typography>
      )}
    </Box>
  );
};

export default NotificationModal;

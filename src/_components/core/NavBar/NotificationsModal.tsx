// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { format } from "date-fns";

// interface Appointment {
//   patientId: {
//     name: string;
//   };
//   doctorId: {
//     name: string;
//   };
//   scheduledDate: string;
//   startTime: string;
//   endTime: string;
//   status: string;
//   TotalFee: number;
// }

// interface NotificationModalProps {
//   selectedNotification: {
//     title: string;
//     body: string;
//     Appointment?: Appointment;
//   } | null;
//   handleModalClose: () => void;
// }

// const NotificationModal: React.FC<NotificationModalProps> = ({
//   selectedNotification,
//   handleModalClose,
// }) => {
//   const details = [
//     { label: "Patient", key: "patientId.name" },
//     { label: "Doctor", key: "doctorId.name" },
//     {
//       label: "Date",
//       key: "scheduledDate",
//       formatter: (val: string) => format(new Date(val), "MM/dd/yyyy"),
//     },
//     {
//       label: "Time",
//       key: "startTime",
//       formatter: (val: string, endTime: string) =>
//         `${format(new Date(val), "h:mm a")} - ${format(
//           new Date(endTime),
//           "h:mm a"
//         )}`,
//     },
//     { label: "Status", key: "status" },
//     {
//       label: "Total Fee",
//       key: "TotalFee",
//       formatter: (val: number) => `$${val.toFixed(2)}`,
//     },
//   ];

//   // Utility function to get nested property safely
//   const getValue = (obj: any, path: string): any => {
//     return path.split(".").reduce((acc, key) => acc?.[key], obj) || "N/A";
//   };

//   return (
//     <Box sx={{ padding: "16px" }}>
//       {selectedNotification ? (
//         <>
//           <Typography
//             fontFamily="var(--font-raleway)"
//             sx={{ marginBottom: "16px", fontWeight: "bold" }}
//           >
//             {selectedNotification.title}
//           </Typography>
//           <Typography variant="body1" sx={{ marginBottom: "16px" }}>
//             {selectedNotification.body}
//           </Typography>

//           {selectedNotification.Appointment && (
//             <>
//               {details.map((detail, index) => {
//                 const value = getValue(selectedNotification.Appointment, detail.key);

//                 const displayValue = detail.formatter
//                   ? detail.formatter(
//                       value,
//                       selectedNotification.Appointment?.endTime
//                     )
//                   : value;

//                 return (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{ width: "40%", fontWeight: "bold" }}
//                     >
//                       {detail.label}:
//                     </Typography>
//                     <Typography variant="body2" sx={{ width: "60%" }}>
//                       {displayValue}
//                     </Typography>
//                   </Box>
//                 );
//               })}
//             </>
//           )}

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginTop: "16px",
//             }}
//           >
//             <Button
//               variant="contained"
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: "700",
//                 fontFamily: "Avenir",
//                 lineHeight: "18px",
//                 width: "100px",
//                 borderRadius: "5px",
//                 backgroundColor: "#FBC02D",
//                 boxShadow: "none",
//                 transition: "all 0.2s ease-in-out",
//                 "&:hover": {
//                   backgroundColor: "#FBC02D",
//                   color: "white",
//                   boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05)",
//                   transform: "scale(1.005)",
//                 },
//               }}
//               onClick={handleModalClose}
//             >
//               Okay
//             </Button>
//           </Box>
//         </>
//       ) : (
//         <Typography variant="body1">No details available.</Typography>
//       )}
//     </Box>
//   );
// };

// export default NotificationModal;

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
    <Box sx={{ padding: "8px 16px" }}>
      {selectedNotification ? (
        <>
          <Typography
            fontFamily="var(--font-avenir)"
            sx={{
              fontSize: "14px",
              marginBottom: "16px",
              lineHeight: "16px",
              color: "#161616",
            }}
          >
            {selectedNotification.title}
          </Typography>
          <Typography
            fontFamily="var(--font-avenir)"
            sx={{
              fontSize: "12px",
              marginBottom: "16px",
              lineHeight: "16px",
              color: "#7B7B7B",
            }}
          >
            {selectedNotification.body}
          </Typography>

          {selectedNotification.Appointment && (
            <Box>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "14px",
                  marginBottom: "16px",
                  lineHeight: "16px",
                  color: "#161616",
                }}
              >
                Appointment Details:
              </Typography>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  lineHeight: "16px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "110px",
                    color: "#7B7B7B",
                  }}
                >
                  Patient:
                </span>
                {selectedNotification.Appointment.patientId.name}
              </Typography>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  lineHeight: "16px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "110px",
                    color: "#7B7B7B",
                  }}
                >
                  Doctor:
                </span>
                {selectedNotification.Appointment.doctorId.name}
              </Typography>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  lineHeight: "16px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "110px",
                    color: "#7B7B7B",
                  }}
                >
                  Date:
                </span>
                {format(
                  new Date(selectedNotification.Appointment.scheduledDate),
                  "MM/dd/yyyy"
                )}
              </Typography>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  lineHeight: "16px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "110px",
                    color: "#7B7B7B",
                  }}
                >
                  Time:
                </span>
                {`${format(
                  new Date(selectedNotification.Appointment.startTime),
                  "h:mm a"
                )} - ${format(
                  new Date(selectedNotification.Appointment.endTime),
                  "h:mm a"
                )}`}
              </Typography>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  lineHeight: "16px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "110px",
                    color: "#7B7B7B",
                  }}
                >
                  Status:
                </span>
                {selectedNotification.Appointment.status}
              </Typography>
              <Typography
                fontFamily="var(--font-avenir)"
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  lineHeight: "16px",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "110px",
                    color: "#7B7B7B",
                  }}
                >
                  Total Fee:
                </span>
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

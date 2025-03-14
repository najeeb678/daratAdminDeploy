import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import AdminDashboard from "@/_components/core/Dashboard/AdminDashboard/AdminDashboard";
import DoctorsDashboard from "@/_components/core/Dashboard/DoctorsDashboard/DoctorDashboard";
import theme, { globalStyles } from "@/styles/Theme/Theme";
import { Box, CircularProgress } from "@mui/material";
import { getGreeting, getRole, getUserDetails } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>({});

  const [greetingText, setGreetingText] = useState("");
  useEffect(() => {
    const userRole = getRole();
    let greetingText = getGreeting();
    const user = getUserDetails();

    setGreetingText(greetingText);
    setUserData(user);
    setRole(userRole);
  }, []);

  if (!userData || !greetingText || role === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#fbc02d" }} />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>DaratAdminPanel</title>
        <meta name="description" content="Dr. Wafa’a Tulbah Clinics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {role === "Admin" ? (
        <AdminDashboard userData={userData} greetingText={greetingText} />
      ) : (
        <DoctorsDashboard userData={userData} greetingText={greetingText} />
      )}
    </>
  );
}

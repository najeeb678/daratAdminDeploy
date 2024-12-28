import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          height: "100%",

          boxShadow: "none",
          borderRadius: "10px",
          backgroundColor: "#fff",
          overflow: "auto",
          border: "1px solid #CECECE",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          <img
            src="/images/404Vector.svg"
            alt="error"
            height={"220px"}
            width={"400px"}
          />

          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "22px",
              mt: "20px",
              mb: "10px",
            }}
          >
            {"Service Unavailable"}
          </Typography>

          <Typography>
            {"You may have mistyped the address or the page may have moved."}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              height: "35px !important",
              fontSize: "13px !important",
              fontWeight: "700 !important",
              fontFamily: "Avenir !important",
              lineHeight: "28px !important",
              borderRadius: "50px !important",
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
              e.preventDefault();
              router.push("/");
            }}
          >
            Back To Home
          </Button>
        </Box>
      </Box>{" "}
    </>
  );
}

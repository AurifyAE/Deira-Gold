import React from "react";
import { Box, Typography } from "@mui/material";
import AurifyLogo from "/images/aurify-logo.svg";

const PoweredByAurify = () => {
 

  return (
    <Box
      sx={{
        textDecoration: "none",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "0.6vw",
        padding: "0.8vw 1.4vw",
      }}
    >
 

      <Typography
        component="a"
        href="https://www.aurify.ae"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontSize: "0.9vw",
          fontWeight: 500,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap:'0.5vw',
          letterSpacing: "0.05em",
        }}
      >
        Powered by

        <img
          src={AurifyLogo}
          alt="Aurify"
          style={{
            height: "1.4vw",
            objectFit: "contain",
          }}
        />
      </Typography>
    </Box>
  );
};

export default PoweredByAurify;

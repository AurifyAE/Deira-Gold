import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const OUNCE = 31.103;
const AED = 3.674;

const KARAT_PURITY = [
  { label: "18K Gold (GM)", value: 0.75 },
  { label: "21K Gold (GM)", value: 0.875 },
  { label: "22K Gold (GM)", value: 0.916 },
  { label: "24K Gold (GM)", value: 0.999 },
];

const GoldKaratRate = () => {
  const { goldData } = useSpotRate();

  const goldPerGram = (goldData.bid / OUNCE) * AED;

  const format2 = (val) =>
    val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#1a1a1a,#0d0d0d)",
        borderRadius: "16px",
        padding: "1vw",
        color: "#fff",
      }}
    >
     

      {/* GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1vw",
        }}
      >
        {KARAT_PURITY.map((k) => {
          const price = goldPerGram * k.value;

          return (
            <Box
              key={k.label}
              sx={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "1vw 0.5vw",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3vw",
                  fontWeight: 600,
                  mb: "0.4vw",
                }}
              >
                {k.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.6vw",
                  fontWeight: 700,
                }}
              >
                {format2(price)}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default GoldKaratRate;

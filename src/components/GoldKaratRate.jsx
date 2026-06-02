import React from "react";
import { Box, Typography } from "@mui/material";

const GoldKaratRate = ({ rates = [] }) => {
  const formatPrice = (val) =>
    Number(val || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });

  // Sort using displayOrder from backend
  const sortedRates = [...rates].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  return (
  <Box
    sx={{
      background:
        "linear-gradient(135deg, #0a0a0a 0%, #141414 40%, #1c1c1c 100%)",
      border: "1px solid rgba(212,175,55,0.25)",
      borderRadius: "20px",
      padding: "1.2vw",
      color: "#fff",
      boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
      overflow: "hidden",
      position: "relative",

      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background:
          "linear-gradient(90deg, transparent, #D4AF37, transparent)",
      },
    }}
  >
    {!sortedRates.length && (
      <Typography
        sx={{
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: "1vw",
          py: "1.5vw",
        }}
      >
        No retail rates available
      </Typography>
    )}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1vw",
      }}
    >
      {sortedRates.map((item, index) => (
        <Box
          key={item._id || index}
          sx={{
            position: "relative",
            borderRadius: "16px",
            padding: "1vw",
            textAlign: "center",
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(212,175,55,0.18)",
            overflow: "hidden",
            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-3px)",
              borderColor: "rgba(212,175,55,0.45)",
              boxShadow: "0 10px 25px rgba(212,175,55,0.15)",
            },

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)",
            },
          }}
        >
          {/* Karat Name */}
          <Typography
            sx={{
              fontSize: "1vw",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              mb: "0.5vw",
            }}
          >
            {item.name}
          </Typography>

          {/* Rate */}
          <Typography
            sx={{
              fontSize: "1.8vw",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#D4AF37",
              textShadow: "0 0 15px rgba(212,175,55,0.25)",
            }}
          >
            ₹ {formatPrice(item.rate)}
          </Typography>

          {/* Unit */}
          <Typography
            sx={{
              mt: "0.3vw",
              fontSize: "0.8vw",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.05em",
            }}
          >
            PER GRAM
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
};

export default React.memo(GoldKaratRate);
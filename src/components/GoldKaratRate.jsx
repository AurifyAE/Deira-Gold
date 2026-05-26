import React from "react";
import { Box, Typography } from "@mui/material";

const GoldKaratRate = ({ rates = [] }) => {
  const formatPrice = (val) =>
    Number(val || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Sort using displayOrder from backend
  const sortedRates = [...rates].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#1a1a1a,#0d0d0d)",
        borderRadius: "16px",
        padding: "1vw",
        color: "#fff",
      }}
    >
      {/* Empty State */}
      {!sortedRates.length && (
        <Typography
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.5)",
            fontSize: "1vw",
            padding: "1vw 0",
          }}
        >
          No retail rates available
        </Typography>
      )}

      {/* GRID */}
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
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "1vw 0.5vw",
              textAlign: "center",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            }}
          >
            {/* Name */}
            <Typography
              sx={{
                fontSize: "1.3vw",
                fontWeight: 600,
                mb: "0.4vw",
                color: "#fff",
              }}
            >
              {item.name} (GM)
            </Typography>

            {/* Rate */}
            <Typography
              sx={{
                fontSize: "1.6vw",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {formatPrice(item.rate)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(GoldKaratRate);
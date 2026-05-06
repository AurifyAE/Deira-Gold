import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

// optional dollar icon (you said you have it)
import dollarIcon from "/icons/dirham-icon.svg";

const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "34% 22% 22% 22%",
  padding: "0.8vw 1vw",
  background: "linear-gradient(180deg,#2a2417,#16130c)",
  color: "#e3b45f",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "34% 22% 22% 22%",
  alignItems: "center",
  padding: "0.8vw 1vw",
  color: "#ffffff",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
};

const MintedBars = ({ mintedBars = [], commodities }) => {

  
  const { goldData, silverData } = useSpotRate();

  /* -----------------------
     HELPERS
  ------------------------ */

  const getSpot = (metal) => {
    if (!metal) return goldData;
    const m = String(metal).toLowerCase();
    if (m.includes("gold")) return goldData;
    if (m.includes("silver")) return silverData;
    return goldData;
  };

  const purityFactor = (purity) => {
    if (purity == null || purity === "") return 1;
    const p = Number(purity);
    if (isNaN(p)) return 1;
    return p / Math.pow(10, String(Math.floor(p)).length);
  };

  const formatByDigits = (value) => {
    if (value == null || isNaN(value)) return "";

    const integerDigits = Math.floor(Math.abs(value)).toString().length;

    let decimals = 3;
    if (integerDigits >= 4) decimals = 0;
    else if (integerDigits === 3) decimals = 2;

    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  /* -----------------------
     BUILD TABLE DATA (minted bars from admin API)
  ------------------------ */

  const buildTableDataFromMintedBars = () => {
    if (!mintedBars?.length) return [];

    return mintedBars
      .filter((item) => item.enabled !== false)
      .map((item) => {
        const spot = getSpot(item.metal || "gold");
        if (!spot?.bid || !spot?.ask) return null;

        const multiplier = UNIT_MULTIPLIER[item.weight] || 1;
        const purity = purityFactor(item.purity);
        const unit = Number(item.unit) || 1;

        const bid =
          (parseFloat(spot.bid) / OUNCE) * AED * multiplier * unit * purity +
          (parseFloat(item.buyCharge) || 0) +
          (parseFloat(item.buyPremium) || 0);

        const ask =
          (parseFloat(spot.ask) / OUNCE) * AED * multiplier * unit * purity +
          (parseFloat(item.sellCharge) || 0) +
          (parseFloat(item.sellPremium) || 0);

        return {
          name: item.name || "Minted Bar",
          purity: item.purity != null ? String(item.purity) : "",
          weight: `${unit} ${item.weight || "GM"}`,
          bid,
          ask,
        };
      })
      .filter(Boolean);
  };

  /* -----------------------
     BUILD TABLE DATA (legacy commodities from spot rate API)
  ------------------------ */

  const buildTableDataFromCommodities = () => {
    if (!commodities?.length) return [];

    return commodities
      .map((item) => {
        const spot = getSpot(item.metal?.toLowerCase());
        if (!spot) return null;

        const multiplier = UNIT_MULTIPLIER[item.weight] || 1;
        const purity = purityFactor(item.purity);

        const bid =
          (parseFloat(spot.bid) / OUNCE) * AED * multiplier * item.unit * purity +
          (parseFloat(item.buyCharge) || 0) +
          (parseFloat(item.buyPremium) || 0);

        const ask =
          (parseFloat(spot.ask) / OUNCE) * AED * multiplier * item.unit * purity +
          (parseFloat(item.sellCharge) || 0) +
          (parseFloat(item.sellPremium) || 0);

        return {
          name:
            item.metal === "Gold Ten TOLA" ? "Gold" : item.metal,
          purity:
            item.metal === "Gold Ten TOLA" ? "TEN TOLA" : item.purity,
          weight: `${item.unit} ${item.weight}`,
          bid,
          ask,
        };
      })
      .filter(Boolean);
  };

  const data =
    mintedBars?.length > 0
      ? buildTableDataFromMintedBars()
      : buildTableDataFromCommodities();

  /* -----------------------
     RENDER
  ------------------------ */

  return (
    <Box sx={{ width: "100%", mt: "1vw" }}>
      {/* HEADER */}
      <Box sx={headerStyle}>
        <Typography fontSize="1.2vw" >
          Minted Bars
        </Typography>

        <Typography fontSize="1.2vw" >
          Unit
        </Typography>

        <Box display="flex" alignItems="center" justifyContent='center' >
          <Typography fontSize="1.2vw" margin='0 0.4vw ' >
            BID
          </Typography>
          ( <img src={dollarIcon} alt="$" style={{ width: "1.2vw", margin: '0 0.2vw' }} /> )
        </Box>

        <Box display="flex" alignItems="center" justifyContent='center' >
          <Typography fontSize="1.2vw" margin='0 0.4vw ' >
            ASK
          </Typography>
          (<img src={dollarIcon} alt="$" style={{ width: "1.2vw", margin: '0 0.2vw' }} />)
        </Box>
      </Box>

      {/* ROWS */}
      {data.map((row, i) => (
        <Box key={i} sx={rowStyle}>
          <Typography fontSize="1.2vw" >
            {row.name} {row.purity}
          </Typography>

          <Typography fontSize="1.2vw" >
            {row.weight}
          </Typography>

          <Typography fontSize="1.2vw" >
            {formatByDigits(row.bid)}
          </Typography>

          <Typography fontSize="1.2vw" >
            {formatByDigits(row.ask)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MintedBars;

import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

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

const CommodityTable = ({
  commodities,
  isMintedBar = false,
  isCommodity = false,
}) => {
  const { goldData, silverData } = useSpotRate();

  /* -----------------------
     HELPERS
  ------------------------ */

  const getSpot = (metal) => {
    if (metal.includes("gold")) return goldData;
    if (metal.includes("silver")) return silverData;
    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / Math.pow(10, purity.toString().length) : 1;

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
     BUILD TABLE DATA
  ------------------------ */

  const buildTableData = () => {
    if (!commodities?.length) return [];

    return commodities
      .map((item) => {
        const spot = getSpot(item.metal.toLowerCase());
        if (!spot) return null;

        const multiplier = UNIT_MULTIPLIER[item.weight] || 1;
        const purity = purityFactor(item.purity);
        const unit = parseFloat(item.unit) || 0;
        
        const weightValue = multiplier * unit;

        const spotBid = parseFloat(spot.bid) || 0;
        const spotAsk = parseFloat(spot.ask) || 0;
        
        const buyPremium = parseFloat(item.buyPremium) || 0;
        const buyCharge = parseFloat(item.buyCharge) || 0;
        const sellPremium = parseFloat(item.sellPremium) || 0;
        const sellCharge = parseFloat(item.sellCharge) || 0;

        const bid =
          ((spotBid + buyPremium) / OUNCE) *
            AED *
            weightValue *
            purity +
          buyCharge;

        const ask =
          ((spotAsk + sellPremium) / OUNCE) *
            AED *
            weightValue *
            purity +
          sellCharge;

        return {
          group: item.group, // IMPORTANT
          name:
            item.group === "group1" && item.metal_name
              ? item.metal_name
              : item.metal === "Gold Ten TOLA"
                ? "Gold"
                : item.metal,
          purity: item.metal === "Gold Ten TOLA" ? "TEN TOLA" : item.purity,
          weight: `${item.unit} ${item.weight}`,
          bid,
          ask,
        };
      })
      .filter(Boolean);
  };

  const data = buildTableData();

  /* -----------------------
     FILTER GROUPS
  ------------------------ */

  const commodityData = data.filter((item) => item.group === "commodity");

  const mintedBarData = data.filter((item) => item.group === "group1");

  /* -----------------------
     TABLE COMPONENT
  ------------------------ */

  const renderTable = (title, rows) => {
    if (!rows.length) return null;

    return (
      <Box sx={{ mb: "2vw" }}>
        {/* HEADER */}
        <Box sx={headerStyle}>
          <Typography fontSize="1.2vw">
            {title == "Minted Bar" ? "Minted Bars" : "Commodity"}
          </Typography>

          <Typography fontSize="1.2vw">Unit</Typography>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography fontSize="1.2vw" margin="0 0.4vw">
              BID
            </Typography>
            (
            <img
              src={dollarIcon}
              alt="$"
              style={{
                width: "1.2vw",
                margin: "0 0.2vw",
              }}
            />
            )
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography fontSize="1.2vw" margin="0 0.4vw">
              ASK
            </Typography>
            (
            <img
              src={dollarIcon}
              alt="$"
              style={{
                width: "1.2vw",
                margin: "0 0.2vw",
              }}
            />
            )
          </Box>
        </Box>

        {/* ROWS */}
        {rows.map((row, i) => (
          <Box key={i} sx={rowStyle}>
            <Typography fontSize="1.2vw" display="flex" alignItems="center" justifyContent={'center'}  gap=".5vw">
              {row.name}
              <Typography fontSize=".9vw" fontStyle={"oblique"} color="#e3b45f">
                {row.purity}
              </Typography>
            </Typography>

            <Typography fontSize="1.2vw">{row.weight}</Typography>

            <Typography fontSize="1.2vw">{formatByDigits(row.bid)}</Typography>

            <Typography fontSize="1.2vw">{formatByDigits(row.ask)}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  /* -----------------------
     RENDER
  ------------------------ */

  return (
    <Box sx={{ width: "100%", mt: "1vw" }}>
      {isCommodity && renderTable("Commodity", commodityData)}
      {isMintedBar && renderTable("Minted Bar", mintedBarData)}
    </Box>
  );
};

export default CommodityTable;

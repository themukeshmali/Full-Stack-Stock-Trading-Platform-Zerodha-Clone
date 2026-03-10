import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios
      .post(`${API_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      })
      .then((res) => {
        console.log("Order placed successfully:", res.data);
      })
      .catch((err) => {
        console.error("Error placing order:", err);
      });

    closeBuyWindow();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div className="action-buttons">
          <Link to="" className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-red" onClick={handleCancelClick}>
            Sell
          </Link>
          <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
            <button className="action-icon">
              <BarChartOutlined className="icon" style={{ fontSize: "20px" }} />
            </button>
          </Tooltip>
          <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
            <button className="action-icon">
              <MoreHoriz className="icon" style={{ fontSize: "20px" }} />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="buttons cancel-row" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
        <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default BuyActionWindow;

import React, { useState, useEffect } from "react";
import axios from "axios";

//import { positions } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.get(`${API_URL}/allPositions`).then((res) => {
      // console.log(res.data);
      setAllPositions(res.data);
    });
  }, []);


  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPositions.map((stock, index) => {
            const avg = stock.avg || 0;
            const price = stock.price || 0;
            const qty = stock.qty || 0;
            const curValue = price * qty;
            const isProfit = curValue - avg * qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{qty}</td>
                <td>{avg.toFixed(2)}</td>
                <td>{price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - avg * qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;

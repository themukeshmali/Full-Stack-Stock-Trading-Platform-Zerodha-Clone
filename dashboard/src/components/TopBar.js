import React, { useState, useEffect } from "react";

import Menu from "./Menu";

const TopBar = () => {
  // Base values for indices
  const [niftyValue, setNiftyValue] = useState(22120.50);
  const [sensexValue, setSensexValue] = useState(73050.40);
  
  // Percent change trackers
  const [niftyPercent, setNiftyPercent] = useState(0.25);
  const [sensexPercent, setSensexPercent] = useState(0.35);

  useEffect(() => {
    // Simulate live market ticking every 2 seconds
    const interval = setInterval(() => {
      // Randomize between -15 and +15 points per tick
      const niftyTick = (Math.random() * 30 - 15); 
      const sensexTick = (Math.random() * 80 - 40);

      setNiftyValue(prev => prev + niftyTick);
      setSensexValue(prev => prev + sensexTick);
      
      // Update fake percentages slightly
      setNiftyPercent(prev => prev + (niftyTick / 22120.50) * 100);
      setSensexPercent(prev => prev + (sensexTick / 73050.40) * 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Formatting helpers
  const formatNumber = (num) => num.toFixed(2);
  const getDirectionClass = (percent) => percent >= 0 ? "up" : "down";
  const getPercentString = (percent) => `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{formatNumber(niftyValue)} </p>
          <p className={`percent ${getDirectionClass(niftyPercent)}`}>{getPercentString(niftyPercent)}</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{formatNumber(sensexValue)}</p>
          <p className={`percent ${getDirectionClass(sensexPercent)}`}>{getPercentString(sensexPercent)}</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

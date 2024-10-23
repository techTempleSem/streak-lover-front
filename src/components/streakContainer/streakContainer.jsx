import { useState, useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import style from "./streakContainer.module.scss";

const height = 7;  // 7 days in a week
const width = 50;  // number of weeks

const blockSize = 13; 
const blockMargin = 2;  
const contentWidth = (blockSize + blockMargin * 2) * width;

const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];  // GitHub-like colors

const buttonStyle = {
  margin: `${blockMargin}px`,
  height: `${blockSize}px`,
  width: `${blockSize}px`,
  borderRadius: "3px",
};

function getDayBlocks(rowNum, streakData) {
  const blocks = [];
  for (let i = 0; i < width; i++) {
    const dayIndex = (width - i - 1) * 7 + rowNum;
    const contributionLevel = streakData[dayIndex]?.level || 0; // mock contribution level

    blocks.push(
      <OverlayTrigger
        key={i}
        placement="top"
        overlay={<Tooltip>{`Contributions: ${contributionLevel}`}</Tooltip>}
      >
        <div
          style={{
            backgroundColor: colors[contributionLevel],
          }}
          className={`${style.block}`}
        ></div>
      </OverlayTrigger>
    );
  }
  return blocks;
}

function getWeekRows(streakData) {
  const rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(
      <div className={style.baseRow} key={`row-${i}`}>
        <div className={style.row}>{getDayBlocks(i, streakData)}</div>
      </div>
    );
  }
  return rows;
}

function StreakContainer({ streak }) {
  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    // Mock fetch data
    const mockData = new Array(350).fill(0).map((_, idx) => ({
      day: idx,
      level: Math.floor(0),  // Random contribution levels
    }));
    mockData[1].level = 1;
    setStreakData(mockData);
  }, []);

  return (
    <Card className={`${style.container} text-center`}>
      <Card.Body>
        <div className={style.streakBox}>
          <div className={style.streak}>
            {getWeekRows(streakData)}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StreakContainer;

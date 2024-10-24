import { useState, useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import style from "./streakContainer.module.scss";

const height = 7;  // 7 days in a week
const width = 50;  // number of weeks

let marginDay = 0;

const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];  // GitHub-like colors

function getDayBlocks(rowNum, streakData) {
  const blocks = [];
  let show = 1;
  if(rowNum < 6 - new Date().getDay()) show = 0;
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
          className={`${style.block} ${show == 0 && i == width - 1 ? style.none : style.display}`}
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

function StreakContainer({ streaks }) {

  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    const today = new Date();
    marginDay = 6 - today.getDay();
    console.log(streaks)
    const streakData = new Array(350).fill(0).map((_, idx) => ({
      day: idx,
      level: Math.floor(0),  // Random contribution levels
    }));

    if(!streaks) {
      return;
    }

    for(let streak of streaks){
      let fr = 1, day = 1;
      let year = Math.floor(streak.month / 100)
      let month = streak.month % 100
      while(1){
        if(fr > streak.check_num) {
          break;
        }
        if((fr & streak.check_num) != 0){
          let targetDate = new Date(`${year}.${month}.${day}`)
          let pos = Math.floor((new Date() - targetDate) / (1000*60*60*24))
          console.log(targetDate, pos);
          streakData[marginDay + pos].level = 1
        }
        day++;
        fr *= 2;
      }
    }

    setStreakData(streakData);
  }, [streaks]);

  return (
    <Card className={`${style.container} text-center`}>
      <Card.Body className={style.realContainer}>
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

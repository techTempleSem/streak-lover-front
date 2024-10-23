import { Button, Card } from "react-bootstrap"
import style from "./streakCard.module.scss"
import axios from "axios";
import { FaFire } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";

function StreakCard({ taskName, streakDays, lastUpdatedAt, onExtend, workId }) {
  function isToday(date) {
    date = new Date(date)
    const today = new Date();
    
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
  
    const givenYear = date.getFullYear();
    const givenMonth = date.getMonth();
    const givenDate = date.getDate();
  
    return todayYear === givenYear && todayMonth === givenMonth && todayDate === givenDate;
  }

  function isYesterday(inputDate) {
    const date = new Date(inputDate);
  
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    // 입력한 날짜와 어제 날짜를 비교 (연도, 월, 일만 비교)
    return date.getFullYear() === yesterday.getFullYear() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getDate() === yesterday.getDate();
  }

  console.log(lastUpdatedAt)

  if(!isToday(lastUpdatedAt) && !isYesterday(lastUpdatedAt)) {
    streakDays = 0;
  }

  return (
    <Card className={`text-center mb-4 ${style.card}`}>
      <Card.Header>{taskName}</Card.Header>
      <Card.Body>
        <FaFire color="orange" size={30} className="mt-2" />
        <Card.Text className={`mt-3 ${style.day}`}>
          {streakDays}일 연속
        </Card.Text>
      </Card.Body>
      {
        isToday(lastUpdatedAt) ? 
        <Card.Footer 
          className="bg-secondary text-white text-center"
        >
          연장 완료
        </Card.Footer> : 
        <Card.Footer 
          className="bg-primary text-white text-center"
          style={{ cursor: 'pointer' }}
          onClick={onExtend}
        >
          연장
        </Card.Footer>
      }
    </Card>
  );
}

export default StreakCard;
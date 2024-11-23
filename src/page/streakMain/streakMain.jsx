import { useEffect, useState } from "react";
import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakMain.module.scss"
import axios from "axios";
import { Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import StreakCard from "../../components/streakCard/streakCard";
import { useNavigate } from "react-router-dom";

const tasks = [
  { name: '운동', streakDays: 23 },
  { name: '독서', streakDays: 15 },
  { name: '코딩', streakDays: 7 },
  { name: '명상', streakDays: 30 },
  { name: '기상', streakDays: 10 },
  { name: '글쓰기', streakDays: 5 },
];

function StreakMain() {
  const [works, setWorks] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const getWork = async ()=>{
      const data = await axios.get('http://localhost:8080/api/user/work')
      setWorks(data.data);
    }
    getWork()
  }, [])

  async function extend(id){
    const data = await axios.post('http://localhost:8080/api/work/extend',{
      "id": id
    })
    setWorks(data.data);
  }

  function addStreak(){
    navigate("/streak-register")
  }

  return (
    <Container>
      <Row>
        {works.length == 0 ? 
        <p>NO WORKS</p> : 
        works.map((work, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <StreakCard
              taskName={work.name}
              streakDays={work.cur_streak}
              lastUpdatedAt={work.last_updated_at}
              workId={work.id}
              dayWeek={work.day_week}
              onExtend={() => extend(work.id)}
            />
          </Col>
        ))}
      </Row>
      <button className={style.addStreakButton} onClick={addStreak}>+ Add Streak</button>
    </Container>
  );
}

export default StreakMain;
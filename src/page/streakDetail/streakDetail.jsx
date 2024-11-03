import { useEffect, useState } from "react";
import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakDetail.module.scss"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { calcStreak, isExpend } from "utils";
import { useAuth } from "App";

function StreakDetail() {
  const [work, setWorks] = useState(null);
  const {id} = useParams();
  const {isLogin} = useAuth();
  const navigate = useNavigate();

  async function getWork (id){
    try{
      const data = await axios.get(`http://localhost:8080/api/work/${id}`)
      if(data.data.state == "DELETE") {
        alert("삭제된 일입니다!");
        navigate("/");
      }
      console.log(data.data)
      if (data.data === null) {
        alert("로그인을 해 주세요");
        navigate("/login");  // 로그인 페이지로 이동
        return;
      }
      setWorks({
        ...data.data.body,
      })
    } catch (e){
      console.error("데이터 가져오기 실패:", e);
    }
  }

  useEffect(() => {
    if(!isLogin){
      return;
    }
    getWork(id)
  },[isLogin]);

  async function extendStreak(){
    try{
      const data = await axios.post('http://localhost:8080/api/work/extend',{
        "id": parseInt(id)
      })
      alert("갱신되었습니다!")
      getWork(id);
    } catch(e){
      console.log(e);
    }
  }

  async function deleteStreak(){
    try{
      const data = await axios.post('http://localhost:8080/api/work/delete',{
        "id" : parseInt(id)
      })
      alert("삭제되었습니다")
      navigate("/")
    } catch(e){
      console.log(e);
    }
  }

  return (
    <Container className={style.streakDetail}>
      {work ? (
        <>
          <div className={style.title}>{work.name}</div>
          <div className={style.createdTime}>created time : {work.created_at}</div>
          <p className={style.streakDescription}>{work.descript}</p>
          <div className={style.streakCount}>🔥 {calcStreak(work.last_updated_at, work.cur_streak, work.day_week)}일 연속</div>

          <StreakContainer streaks={work.streak} dayWeek={work.day_week}></StreakContainer>
          <ButtonGroup aria-label="Basic example">
            <Button className={style.extendButton} variant="primary" onClick={extendStreak} disabled={!isExpend(work.last_updated_at, work.day_week)}>연장</Button>
            <Button className={style.extendButton} variant="danger" onClick={deleteStreak}>삭제</Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          loading....
        </>
      )}
      
    </Container>
  );
}

export default StreakDetail;
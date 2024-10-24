import { useEffect, useState } from "react";
import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakDetail.module.scss"
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function StreakDetail() {
  const [work, setWorks] = useState(null);
  const {id} = useParams();

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

  async function getWork (id){
    const data = await axios.get(`http://localhost:8080/api/work/${id}`)
    setWorks({
      ...data.data,
    })
  }

  useEffect(() => {
    console.log(id)
    getWork(id)
  },[]);

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

  return (
    <Container className={style.streakDetail}>
      {work ? (
        <>
          <div className={style.title}>{work.name}</div>
          <div className={style.createdTime}>created time : {work.created_at}</div>

          <StreakContainer streaks={work.streak}></StreakContainer>
          <Button className={style.extendButton} variant="primary" onClick={extendStreak} disabled={isToday(work.last_updated_at)}>연장</Button>
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
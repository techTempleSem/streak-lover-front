import { useEffect, useState } from "react";
import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakDetail.module.scss"
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function StreakDetail() {
  const [work, setWorks] = useState({});
  const {id} = useParams();

  useEffect(() => {
    console.log(id)
    const getWork = async ()=>{
      const data = await axios.get(`http://localhost:8080/api/work/${id}`)
      console.log(data)
      setWorks(data.data)
    }
    getWork()
  },[]);

  async function extendStreak(){
    // const data = await axios.get('http://localhost:8080/api/work/extend')
    // console.log(data);
  }

  return (
    <Container className={style.streakDetail}>
      <div className={style.title}>homework</div>
      <div className={style.createdTime}>created time : {work.created_at}</div>

      <StreakContainer streak={work.streak}></StreakContainer>
      <Button className={style.extendButton} variant="primary" onClick={extendStreak}>연장</Button>
    </Container>
  );
}

export default StreakDetail;
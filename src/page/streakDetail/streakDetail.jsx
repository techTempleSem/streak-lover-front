import { useEffect, useState } from "react";
import StreakContainer from "../../components/streakContainer/streakContainer";
import style from "./streakDetail.module.scss"
import axios from "axios";

function StreakDetail() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const getWork = async ()=>{
      const data = await axios.get('http://localhost:8080/api/user/work')
      setWorks(data.data);
    }
    getWork()
  },[]);

  return (
    <div>
      {
        works.length > 0 ? 
        works.map(work => (
          <StreakContainer title={work.name} id={work.order_num} key={`container ${work.order_num}`}></StreakContainer>
        )) : 
        (<p>NO WORKS</p>)
      }
    </div>
  );
}

export default StreakDetail;
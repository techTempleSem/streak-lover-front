import style from "./streakContainer.module.scss"

const height = 7
const width = 50
const week = (new Date()).getDay()
let streakId = 0


function row(rowNum){
  const blocks = []
  for(let i=0;i<width;i++){
    if(i + 1 == width && rowNum > week) break;
    const today = (width - i - 1) * 7 + week - rowNum
    const isDone = (today == 1)
    blocks.push(<div className={`${style.block} ${streakId == 1 && isDone ? style.done : ''}`}></div>)
  }
  return blocks;
}

function draw(){
  const blocks = []
  for(let i=0;i<height;i++){
    blocks.push(<div className={style.row}>{row(i)}</div>)
  }
  return blocks;
}

function StreakContainer({title, id}) {
  streakId = id
  return (
    <div class={style.container}>
      <p className={style.title}>{title}</p>
      <div className={style.streak}>
        {draw()}
      </div>
    </div>
  );
}

export default StreakContainer;
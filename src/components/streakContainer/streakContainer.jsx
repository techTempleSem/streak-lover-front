import { Card } from "react-bootstrap"
import style from "./streakContainer.module.scss"

const height = 7
const width = 50
const week = (new Date()).getDay()

const blockSize = 13
const blockMargin = 1
const contentWidth = (blockSize + blockMargin * 2) * width;
let streakId = 0

const buttonStyle = {
  margin: `${blockMargin}px`,
  height: `${blockSize}px`,
  width: `${blockSize}px`,
};

const baseRow = {
  width: `${contentWidth}px`,
};

function row(rowNum){
  const blocks = []
  for(let i=0;i<width;i++){
    if(i + 1 == width && rowNum > week) break;
    const today = (width - i - 1) * 7 + week - rowNum
    const isDone = (today == 1)
    blocks.push(<div style={buttonStyle} className={`${style.block} ${streakId == 1 && isDone ? style.done : ''}`}></div>)
  }
  return blocks;
}

function draw(){
  const blocks = []
  for(let i=0;i<height;i++){
    blocks.push((
      <div style={baseRow} className={style.baseRow} key={`row+${i}`}>
        <div className={style.row}>{row(i)}</div>
      </div>
    ))
  }
  return blocks;
}

function StreakContainer({title, id}) {
  streakId = id
  return (
    <Card className={`${style.container} text-center`}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <div className={style.streak}>
          {draw()}
        </div>
      </Card.Body>
    </Card>
    // <div class={style.container}>
    //   <p className={style.title}>{title}</p>
    //   <div className={style.streak}>
    //     {draw()}
    //   </div>
    // </div>
  );
}

export default StreakContainer;
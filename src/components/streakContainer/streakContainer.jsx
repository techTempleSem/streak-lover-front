import style from "./streakContainer.module.scss"

function StreakContainer({title}) {
  return (
    <div class={style.container}>
      <p className={style.title}>{title}</p>
    </div>
  );
}

export default StreakContainer;
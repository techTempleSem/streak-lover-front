// ExplanationPage.js
import React from 'react';
import style from './explanationPage.module.scss';

const ExplanationPage = () => {
  return (
    <div className={style.explanationPage}>
      <section className={style.section}>
        <h2 className={style.title}>스트릭 서비스 소개</h2>
        <p className={style.text}>
        우리의 스트릭 서비스는 목표를 꾸준히 달성하고자 하는 유저들을 위해 설계된 관리 플랫폼입니다. 사용자들은 운동, 학습, 습관 관리 등 일상에서 지속적으로 이루고 싶은 활동을 스트릭으로 설정하고, 이를 관리할 수 있습니다. 이 서비스는 사용자의 목표 달성에 있어 동기 부여를 높이며, 성취감을 더할 수 있도록 다양한 기능들을 제공하고 있습니다.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.title}>유저 맞춤형 스트릭 관리 기능</h2>
        <p className={style.text}>
        서비스의 주요 기능 중 하나는 사용자가 원하는 일정에 맞춰 스트릭을 설정하고 관리할 수 있다는 점입니다. 각 스트릭에는 제목과 설명을 붙이고, 주간 달성 요일을 선택하여 반복적인 목표를 계획할 수 있습니다. 또한 스트릭을 누적해 나가는 과정을 한눈에 확인할 수 있도록, 사용자는 자신의 기록을 시각적으로 볼 수 있는 기능도 제공됩니다. 이러한 기능들은 유저가 목표를 더 구체적으로 설정하고, 스스로의 성과를 직관적으로 파악할 수 있게 돕습니다.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.title}>성과 추적 및 시각화</h2>
        <p className={style.text}>
        완료한 일자와 성과가 기록되는 히스토리 기능을 통해, 유저는 자신의 성취를 한눈에 확인할 수 있습니다. 스트릭의 진행 상황은 사용자의 노력과 성과를 시각적으로 보여주며, 이를 통해 성취감과 동기 부여가 지속됩니다. 마치 GitHub의 기여 기록과 같이, 특정 일자에 수행한 작업이 한눈에 들어오도록 설계되어 유저가 꾸준히 목표를 유지할 수 있도록 돕습니다.
        </p>
      </section>
    </div>
  );
};

export default ExplanationPage;

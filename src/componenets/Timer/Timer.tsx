import * as React from 'react';

import * as styles from './Timer.less';
interface TimerProps {
    time: number;
}

// var d = Math.floor(distance / (1000 * 60 * 60 * 24));//일

// var h = Math.floor((distance / (1000*60*60)) % 24);//시간
// var m = Math.floor((distance / (1000*60)) % 60);//분
// var s = Math.floor((distance / 1000) % 60);//초
// test

const Timer: React.SFC<TimerProps> = (props) => {
  return (
      <div className={styles.idx}>
        { Math.floor(props.time / (1000 * 60 * 60 * 24)) > 0 && <div>{Math.floor(props.time / (1000 * 60 * 60 * 24))}일&nbsp;</div> }
          <div>{Math.floor((props.time / (1000*60*60)) % 24)}</div>
          <div>시간&nbsp;</div>
          <div>{Math.floor((props.time / (1000*60)) % 60)}</div>
          <div>분&nbsp;</div>
          <div>{Math.floor((props.time / 1000) % 60)}</div>
          <div>초&nbsp;</div>
          <div>&nbsp;후에&nbsp;종료됩니다!!</div>
      </div>
  )
};

export default Timer;
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
        { Math.floor(props.time / (1000 * 60 * 60 * 24)) > 0 && <div>{Math.floor(props.time / (1000 * 60 * 60 * 24))}일</div> }
          <div>{Math.floor((props.time / (1000*60*60)) % 24)}</div>
          <div>:</div>
          <div>{Math.floor((props.time / (1000*60)) % 60)}</div>
          <div>:</div>
          <div>{Math.floor((props.time / 1000) % 60)}</div>
      </div>
  )
};

export default Timer;
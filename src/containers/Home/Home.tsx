import * as React from 'react';
// import { Link } from 'react-router-dom';

import * as classNames from "classnames/bind";
import * as styles from './Home.less';

const cx = classNames.bind(styles);

import circles from '../../assets/images/circles.png';
import cloud1 from '../../assets/images/cloud1.png';
import cloud2 from '../../assets/images/cloud2.png';
import cloud3 from '../../assets/images/cloud3.png';
import desk from '../../assets/images/desk.png';
// import stars from '../../assets/images/stars.png';

// import Timer from '../../componenets/Timer/Timer';

export interface HomeProps {
  dDay: Date;
}

export interface HomeState {
  timer: number;
}

export default class Home extends React.Component<HomeProps, HomeState> {
  private counter: NodeJS.Timer;

  constructor(props: HomeProps) {
    super(props);
    this.state = { timer: props.dDay.getTime() - new Date().getTime() };
    this.update = this.update.bind(this);
  }

  public componentDidMount() {
    this.counter = setInterval(this.update, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.counter);
  }

  public render() {
    return (
      <div className={styles.idx}>
        <div>
          <p>
            <span>제</span>
            <span>4</span>
            <span>회</span>
            <span>선린해커톤</span>
          </p>

          <img src={desk} alt="" className={cx("desk")}/>
          <img src={circles} alt="" className={cx("circles")}/>
          {/* <img src={stars} alt="" className={cx("stars")}/> */}


          <img src={cloud1} alt="" className={cx("cloud", "x1")}/>
          <img src={cloud2} alt="" className={cx("cloud", "x2")}/>
          <img src={cloud3} alt="" className={cx("cloud", "x3")}/>

          {/* <Timer time={this.state.timer}/> */}
          {/* <Link to="apply">GET STARTED</Link> */}
          <span>신청까지 얼마남지 않았어요!</span>
        </div>
      </div>
    );
  }

  private update() {
    this.setState({ timer: this.props.dDay.getTime() - new Date().getTime() })
  }
}

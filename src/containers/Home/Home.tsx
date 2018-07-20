import axios from 'axios';
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
import CheckModal from '../CheckModal/CheckModal';
// import stars from '../../assets/images/stars.png';

import Timer from '../../componenets/Timer/Timer';

export interface HomeProps {
  dDay: Date;
}

export interface HomeState {
  timer: number;
  showCheckModal: string;
}

export default class Home extends React.Component<HomeProps, HomeState> {
  private counter: NodeJS.Timer;

  constructor(props: HomeProps) {
    super(props);
    this.state = { 
      timer: props.dDay.getTime() - new Date().getTime(),
      showCheckModal: "disabled",
    };

    this.update = this.update.bind(this);
    this.onClickCheck = this.onClickCheck.bind(this);

    this.cmClickCancel = this.cmClickCancel.bind(this);
    this.cmAnimationEnd = this.cmAnimationEnd.bind(this);
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
          {/* <span>주제는 목요일 22시에 공개됩니다!</span> */}
          <button onClick={this.onClickCheck}>주제 확인하기</button>
          {/* <span>신청까지 얼마남지 않았어요!</span> */}

          <Timer time={this.state.timer} />
        </div>
        <CheckModal
          show={this.state.showCheckModal}
          onClickCancel={this.cmClickCancel}
          animationEnd={this.cmAnimationEnd}
        />
      </div>
    );
  }

  private update() {
    this.setState({ timer: this.props.dDay.getTime() - new Date().getTime() })
  }

  private onClickCheck() {
    this.checkTime()
    // this.setState({showCheckModal: "show"});
  }

  private cmClickCancel() {
    this.setState({showCheckModal: "disable"});
  }

  private cmAnimationEnd() {
    if(this.state.showCheckModal === "disable") {
      this.setState({showCheckModal: "disabled"})
    }
  }

  private checkTime() {
    axios.get('/api/time').then(res => {
      
      if(new Date(res.data.date) > new Date("Thu Jul 19 2018 21:00:00 GMT+0900 (한국 표준시)")) {
        this.setState({showCheckModal: "show"});
      } else {
        alert("아직 22시가 아닙니다. ㅠㅠ")
      }
    })
  }
}

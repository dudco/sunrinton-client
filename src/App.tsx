import * as React from 'react';
import { Route } from 'react-router-dom';

import back from './assets/images/apply-back.png';
import desk from './assets/images/desk.png';

import Preload from './Preload';

import axios from 'axios';

import * as styles from "./App.less";

import { MoonLoader } from 'react-spinners';

// import About from './componenets/About/About';
import Apply from './containers/Apply/Apply';
import Home from './containers/Home/Home';
const loadingIndicator = (
  <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <MoonLoader
      color={'#642c8f'}
    />
  </div>
);



// const font1 = require('./assets/fonts/ch_m.woff');
// const font2 = require('./assets/fonts/ch_l.woff');

const images = [
  desk,
  back,
  // './assets/fonts/ch_m.ttf', 
  // './images/apply-back.png', 
  // './images/circles.png', 
  // './images/cloud1.png', 
  // './images/cloud2.png',
  // './images/cloud3.png',/
  // './images/desk.png',
  // './images/stars.png',
];

// const fonts = [
//   font1,
//   font2
// ]

class App extends React.Component {
  public componentDidMount() {
    axios.get('/api/test').then((res) => {
      console.log(res.data);
    })
  }
  public render() {
    return (
      <Preload
        loadingIndicator={loadingIndicator}
        images={images}
        autoResolveDelay={13000}
        resolveOnError={false}
        mountChildren={true}
      >
        <div className={styles.idx}>
          <Route
            exact={true}
            path="/"
            render={this.renderHome}
          />
          <Route
            exact={true}
            path="/apply"
            component={Apply}
          />

          {/* <Route path="/about" component={About} /> */}
          <div className={styles.star1} />
          <div className={styles.star2} />
          <div className={styles.star3} />
          <div className={styles.shootingStars} />
        </div>
      </Preload>
    );
  }
  private renderHome(props: any) {
    return <Home dDay={new Date("2018-7-20 12:00:00")} />
  }
}

export default App;

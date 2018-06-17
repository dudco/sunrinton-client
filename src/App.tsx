import axios from 'axios';
import { History as _Hisotory } from 'history';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

import back from './assets/images/apply-back.png';
import desk from './assets/images/desk.png';



import * as styles from "./App.less";


// import About from './componenets/About/About';
// import Admin from './containers/Admin/Admin';
import Apply from './containers/Apply/Apply';
import Home from './containers/Home/Home';
import Preload from './Preload';

const loadingIndicator = (
  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <MoonLoader
      color={'#642c8f'}
    />
  </div>
);

const images = [
  desk,
  back,
];

interface AppProps {
  history: _Hisotory;
}

class App extends React.Component<AppProps, any> {
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
        {/* {
          this.props.history.location.pathname === "/admin" ?
            <Route
              exact={true}
              path="/admin"
              component={Admin}
            /> : */}
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
        {/* } */}
      </Preload>
    );
  }
  private renderHome(props: any) {
    return <Home dDay={new Date("2018-7-20 12:00:00")} />
  }
}

export default App;

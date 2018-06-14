import * as React from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';

import * as styles from "./App.less";

// import About from './componenets/About/About';
import Apply from './containers/Apply/Apply';
import Home from './containers/Home/Home';

class App extends React.Component {
  public componentDidMount() {
    axios.get('/api/test').then((res) => {
      console.log(res.data);
    })
  }
  public render() {
    return (
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
        <div className={styles.star1}/>
        <div className={styles.star2}/>
        <div className={styles.star3}/>
        <div className={styles.shootingStars}/> 
      </div>
    );
  }
  private renderHome(props: any) {
      return <Home dDay={new Date("2018-7-20 12:00:00")}/>
  }
}

export default App;

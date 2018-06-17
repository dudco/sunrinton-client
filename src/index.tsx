import {createBrowserHistory} from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.less';
// import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <App history={history}/>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();

//import React from 'react';
import dva from 'dva'; // { connect }
import createLoading from 'dva-loading';
import 'antd/dist/antd.less'   //'antd/dist/antd.css';
import './style.css';

const app = dva();
// 2. Plugins
app.use(createLoading());

app.model(require('./models/global').default);
app.model(require('./models/login').default);

app.router(require('./router').default);
app.start('#root');
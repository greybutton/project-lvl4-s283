import 'bootstrap/dist/css/bootstrap.min.css';
import gon from 'gon';
import io from 'socket.io-client';
import faker from 'faker';

import '../assets/application.css';
import * as actionCreators from './actions';
import app from './index.jsx';
import { setCookies } from './cookies';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const randomName = faker.name.findName();
setCookies('username', randomName);

const appStore = app(gon);

const socket = io();
socket.on('newMessage', (data) => {
  appStore.dispatch(actionCreators.receiveMessageState(data));
});

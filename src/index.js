import gon from 'gon';
import io from 'socket.io-client';
import faker from 'faker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import * as actionCreators from './actions';
import app from './index.jsx';
import { setCookies } from './cookies';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

library.add(faTrashAlt);
library.add(faEdit);

const randomName = faker.name.findName();
setCookies('username', randomName);

const appStore = app(gon);

const socket = io();
socket.on('newMessage', (data) => {
  appStore.dispatch(actionCreators.receiveMessage(data));
});

socket.on('newChannel', (data) => {
  appStore.dispatch(actionCreators.receiveChannel(data));
});

socket.on('removeChannel', (data) => {
  appStore.dispatch(actionCreators.removeChannelSuccess(data));
});

socket.on('renameChannel', (data) => {
  appStore.dispatch(actionCreators.updateChannelSuccess(data));
});

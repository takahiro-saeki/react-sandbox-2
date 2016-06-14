import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import STYLE from '../css/style.css';
import ChatApp from './components/ChatApp.react';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from './utils/ChatWebAPIUtils';
ChatExampleData.init();
ChatWebAPIUtils.getAllMessages();

ReactDOM.render(
    <ChatApp />,
    document.getElementById('app')
);

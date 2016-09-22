var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: "AIzaSyDfPuxNav3inT1JeWvzWRQk-AHvdCwpqqw",
    authDomain: "aurelistophe.firebaseapp.com",
    databaseURL: "https://aurelistophe.firebaseio.com",
    storageBucket: "aurelistophe.appspot.com",
    messagingSenderId: "164238200047"
};
firebase.initializeApp(config);

import React, { Component } from 'react';
import {render} from 'react-dom';

class Hello extends Component {

    render() {
        return (
            <div>Hey!</div>
        );
    }
}

class App extends Component {

    render() {
        return (
            <Hello />
        )
    }
}

render(<App />, document.getElementById('root'));

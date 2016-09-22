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
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import moment from 'moment';

class Hello extends Component {

    formattedDate(element) {
        var eventDateStr = element.date;
        var eventDate = moment(eventDateStr).format('DD/MM/YYYY HH:mm');
        return eventDate.toString();
    }

    componentWillMount() {

        var ref = firebase.database().ref('/');
        this.bindAsArray(ref, 'items');
    }

    render() {
        var self = this;
        return (
            <ul> {
                this.state.items.map(function (element) {
                    return (
                        <li key={element.date}>{self.formattedDate(element)} : {element.title}</li>
                    );
                })
            }
            </ul>
        );
    }
}

reactMixin(Hello.prototype, ReactFireMixin);

class App extends Component {

    render() {
        return (
            <Hello />
        )
    }
}

render(<App />, document.getElementById('root'));
